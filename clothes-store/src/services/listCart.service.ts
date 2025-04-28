import { inject, Injectable } from "@angular/core";
import { cartList } from "../modules/cart.list.module";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
    providedIn: 'root'
})


export class listCartServices{

    private key_local_storage = 'cartItem'

    private cart = new BehaviorSubject<cartList[]>(this.getFromLocalStorage())
    cart$ = this.cart.asObservable() // observar mudanças no carrinho

    messageService = inject(MessageService)

    private getFromLocalStorage(): cartList[]{
        if(typeof window !== 'undefined' && localStorage){
            const item = localStorage.getItem(this.key_local_storage)
            return item ? JSON.parse(item) : []
        }
        return []
    }


    private updateLocalStorage(cartItem: cartList[]) {
        localStorage.setItem(this.key_local_storage, JSON.stringify(cartItem))
        this.cart.next(cartItem)
    }


    addingToCart(product: cartList){
        const currentProduct = this.cart.getValue()
        const existe = currentProduct.find(item => item.id === product.id)
        
        if(existe){

            if(existe.cart_quantity! < existe.quantity){
                let newQuantity = existe.cart_quantity! += 1

                if(newQuantity <= existe.quantity){
                    existe.cart_quantity = newQuantity
                }else{
                    this.messageService.showMessage('Max Reached', 'info')
                }
                
            }else{
                this.messageService.showMessage('Max Reached', 'info')
            }
            
        }else{
            currentProduct.push({...product, cart_quantity: 1})
        }
        
        this.updateLocalStorage(currentProduct)
    }


    updatingQuantity(productId: number){
        const currentProduct = this.cart.getValue()
        const product = currentProduct.find(item => item.id === productId)

        
        product!.cart_quantity!--
        this.updateLocalStorage(currentProduct)
        
        if(product!.cart_quantity! <= 0){
            this.removingProduct(productId)
        }
        
    }


    removingProduct(productId: number){
        const product = this.cart.getValue().filter(item => item.id !== productId)
        this.updateLocalStorage(product)
    }


    addingOneMore(productId: number){
        const product = this.cart.getValue()
        const existProduct = product.find(item => item.id == productId)

        if(existProduct){

            if(existProduct.cart_quantity! < existProduct.quantity){
                let newQuantity = existProduct.cart_quantity! += 1
                

                if(newQuantity <= existProduct.quantity){
                    existProduct.cart_quantity = newQuantity
                }else{

                    this.messageService.showMessage('Max Reached', 'info')
                }

            }else{
                this.messageService.showMessage('Max Reached', 'info')
            }

        }
        this.updateLocalStorage(product)
        
    }
    

    // taking all price
    allPrice$: Observable<number> = this.cart$.pipe(
        map(items => items.reduce((acc, item) => acc + item.price * item.cart_quantity!, 0))
    )

    // taking all quantity
    allQtd$: Observable<number> = this.cart$.pipe(
        map(items => items.reduce((junt, product) => junt + product.cart_quantity!,0))
    )


}

