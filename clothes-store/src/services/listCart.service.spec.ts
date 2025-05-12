
import { TestBed } from "@angular/core/testing";
import { listCartServices } from "./listCart.service";
import { BehaviorSubject } from "rxjs";
import { cartList } from "../modules/cart.list.module";


fdescribe('ListCartService', () =>{
    let service: listCartServices
    

    beforeEach(() =>{

        const product = [{id: 1, name: 'something', price: 12, image: 'any', quantity: 5, cart_quantity: 3}]
        localStorage.setItem('cartItem', JSON.stringify(product))

        service = TestBed.inject(listCartServices)
        
    })


    it('Shoul be created', () =>{
        expect(service).toBeTruthy()
    })

    it('Adding new Product to cart shop', () =>{
        const obj = {name: 'jkd', price: 4, image: 'jkjdf', quantity: 8}
            
        service.addingToCart(obj)

        service.cart$.subscribe((items: any) =>{
            expect(items).not.toBeNull()
        })

    })


    it("Should deacrease product's quantity", () =>{

        // ARRANGE
        spyOn<any>(service, 'updateLocalStorage')
        spyOn(service, 'removingProduct')

        // ACT
        service.decreasingProductsQuantity(1)

        // ASSERT
        expect(service.removingProduct).not.toHaveBeenCalled()
        expect((service as any).updateLocalStorage).toHaveBeenCalled()

        service.cart$.subscribe((item: any) =>{
            console.log(item)
            expect(item.length).toBeGreaterThan(0)
            expect(item[0].cart_quantity).toBe(2)
        })

    })



})
