
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

    it('Adding new Product to cart shop', () =>{
        const obj = {name: 'jkd', price: 4, image: 'jkjdf', quantity: 8}
            
        service.addingToCart(obj)

        service.cart$.subscribe((items: any) =>{
            expect(items).toBeTruthy()
            expect(items.length).toBe(1)
            
            const item = items.find((it: any) => it.name === 'jkd')
            expect(item.price).toBe(4)
            expect(item.image).toBe('jkjdf')
        })

    })

   

})
