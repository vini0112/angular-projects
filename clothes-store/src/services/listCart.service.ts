import { Injectable } from "@angular/core";
import { cartList } from "../modules/cart.list.module";

@Injectable({
    providedIn: 'root'
})

export class listCartServices{
    private cart: cartList[] = []


    addingToCart(product: cartList): void{
        const ifExiste = this.cart.find(item => item.id === product.id)

        if(ifExiste){
            ifExiste.quantity += product.quantity
        }else{
            this.cart.push({...product})
        }
    }

    removingProduct(productId: number): void{
        this.cart = this.cart.filter(item => item.id !== productId)
    }

    gettingAllProductsCart(): cartList[]{
        return this.cart
    }

    clearCart(){
        this.cart = []
    }

    getTotal(){
        return this.cart.reduce((total, item) => total + item.price * item.quantity,0)
    }

}

