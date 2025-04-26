
import { TestBed } from "@angular/core/testing";
import { listCartServices } from "./listCart.service";


describe('ListCartService', () =>{
    let service: listCartServices

    beforeEach(() =>{
        service = TestBed.inject(listCartServices)
    })

    it('Shoul be created', () =>{
        expect(service).toBeTruthy()
    })

    fit('Adding new Product to cart shop', () =>{
        const obj = {name: 'jkd', price: 4, image: 'jkjdf', quantity: 8}
        service.addingToCart(obj)

        service.cart$.subscribe(val =>{
            if(val == null){
                expect(val).toEqual(null)
                
            }

            

        })
    })


})
