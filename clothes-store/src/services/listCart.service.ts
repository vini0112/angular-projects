import { Injectable } from "@angular/core";
import { cartList } from "../modules/cart.list.module";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})


export class listCartServices{
    private cart: cartList[] = []

    private cartSubject = new BehaviorSubject<cartList[]>(this.cart)
    cartItems$ = this.cartSubject.asObservable() // observar mudanças no carrinho

    private totalSum = new BehaviorSubject<number>(0)
    total$ = this.totalSum.asObservable()

    private qtdProducts = new BehaviorSubject<number>(0)
    allQtdProducts$ = this.qtdProducts.asObservable()


    addingToCart(product: cartList): void{
        const ifExiste = this.cart.find(item => item.id === product.id)

        if(ifExiste){
            ifExiste.quantity += product.quantity
            
        }else{
            this.cart.push({...product})
        }
        this.getTotal()
    }

    removingProduct(productId: number): void{
        const existProduct = this.cart.find(item => item.id === productId)
        
        existProduct!.quantity--
        this.getTotal()

        if(existProduct?.quantity == 0){
            this.cart = this.cart.filter(item => item.id !== productId)
            
            this.cartSubject.next(this.cart)
        }
        
    }

    addingOneMore(productId: number){
        const existProduct = this.cart.find(item => item.id == productId)
        if(existProduct){
            existProduct.quantity++
            this.getTotal()
        }
        
    }
    
    getTotal(){
        const totalAll = this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
        const allQtd = this.cart.reduce((total, item) => total + item.quantity, 0)

        this.totalSum.next(totalAll)
        this.qtdProducts.next(allQtd)
    }



    // NOT IN USED BUT USEFUL

    clearCart(){
        this.cart = []
    }

    gettingAllProductsCart(): cartList[]{
        return this.cart
    }

}

