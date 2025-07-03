import { inject, Injectable } from "@angular/core";
import { cartList } from "../modules/cart.list.module";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
    providedIn: 'root'
})


export class listCartServices{

    messageService = inject(MessageService)
    

    private key_local_storage = 'cartItem'

    private cart = new BehaviorSubject<cartList[]>(this.getFromLocalStorage())
    cart$ = this.cart.asObservable()

    
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
        const productExist = currentProduct.find(item => item.id === product.id)
        
        if(!productExist){
            currentProduct.push({...product, cart_quantity: 1})
        }

        else{
            if(productExist.cart_quantity! >= productExist.quantity){
                this.messageService.showMessage('Max Reached', 'info')
                return
            }

            productExist.cart_quantity! += 1
        }

        this.updateLocalStorage(currentProduct)
        
    }


    decreasingProductsQuantity(productId: number){
        const currentProduct = this.cart.getValue()
        const product = currentProduct.find(item => item.id === productId)

        if(product){
            product.cart_quantity!--
            this.updateLocalStorage(currentProduct)
            
            if(product.cart_quantity! <= 0){
                this.removingProduct(productId)
            }
        }
        
    }


    removingProduct(productId: number){
        const product = this.cart.getValue().filter(item => item.id !== productId)
        this.updateLocalStorage(product)
    }


    addingOneMore(productId: number){
        const cartProducts = this.cart.getValue()
        const index = cartProducts.findIndex(item => item.id === productId)

        if(index === -1){
            this.messageService.showMessage('Product not found in the cart!', 'info')
            return
        }
        
        const product = cartProducts[index]

        if(product.cart_quantity! >= product.quantity){
            this.messageService.showMessage('Max Reached', 'info')
            return
        }

        cartProducts[index] ={
            ...product,
            cart_quantity: product.cart_quantity! + 1
        }


        this.updateLocalStorage(cartProducts)
        
    }
    

    // taking all price
    getTotalPriceCart$: Observable<number> = this.cart$.pipe(
        map(items => items.reduce((acc, item) => acc + item.price * item.cart_quantity!, 0))
    )
    

    // taking all quantity
    getTotalQuantityProducts_inCart$: Observable<number> = this.cart$.pipe(
        map(items => items.reduce((junt, product) => junt + product.cart_quantity!,0))
    )


    // 

    private isOpen = new BehaviorSubject<boolean>(false);
    public isOpen$ = this.isOpen.asObservable();

    openCart() {
        this.isOpen.next(true);
        document.body.classList.add('body_no_scroll');
    }

    closeCart() {
        this.isOpen.next(false);
        document.body.classList.remove('body_no_scroll');
    }

    toggleCart() {
        const open = this.isOpen.getValue();
        this.isOpen.next(!open);
        document.body.classList.toggle('body_no_scroll', !open);
    }



}

