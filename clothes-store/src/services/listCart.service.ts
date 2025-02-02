import { Injectable } from "@angular/core";
import { cartList } from "../modules/cart.list.module";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})


export class listCartServices{
    private key_local_storage = 'cartItem'

    private cart = new BehaviorSubject<cartList[]>(this.getFromLocalStorage())
    cart$ = this.cart.asObservable() // observar mudanças no carrinho



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
            existe.quantity += product.quantity
        }else{
            currentProduct.push({...product})
        }
        
        this.updateLocalStorage(currentProduct)
    }


    updatingQuantity(productId: number){
        const currentProduct = this.cart.getValue()
        const product = currentProduct.find(item => item.id === productId)

        
        product!.quantity--
        this.updateLocalStorage(currentProduct)
        
        if(product!.quantity <= 0){
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
            existProduct.quantity++
        }
        this.updateLocalStorage(product)
        
    }
    

    // taking all price
    allPrice$: Observable<number> = this.cart$.pipe(
        map(items => items.reduce((acc, item) => acc + item.price * item.quantity, 0))
    )

    // taking all quantity
    allQtd$: Observable<number> = this.cart$.pipe(
        map(items => items.reduce((junt, product) => junt + product.quantity,0))
    )


}

