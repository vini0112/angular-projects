
import { TestBed } from "@angular/core/testing";
import { listCartServices } from "./listCart.service";
import { MessageService } from "./message.service";


describe('ListCartService', () =>{
    let service: listCartServices
    let spyMessageService: jasmine.SpyObj<MessageService>
    

    beforeEach(() =>{

        spyMessageService = jasmine.createSpyObj('MessageService', ['showMessage'])

        const product = [{id: 1, name: 'something', price: 12, image: 'any', quantity: 4, cart_quantity: 3}]
        localStorage.setItem('cartItem', JSON.stringify(product))

        TestBed.configureTestingModule({
            providers: [{provide: MessageService, useValue:spyMessageService}]
        })
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

    it("Should increase one more in product's quantity", () =>{


        //ACT
        service.addingOneMore(1)

        // ASSERT
        service.cart$.subscribe(item =>{
            expect(item[0].cart_quantity).toBe(4)
        })

        expect(spyMessageService.showMessage).not.toHaveBeenCalled()

    })

    it("Should take the total prices and total quantities", () =>{

        
        // ASSERT
        service.getTotalPriceCart$.subscribe(n => {
            expect(n).toBe(36)
        })

        service.getTotalQuantityProducts_inCart$.subscribe(n => {
            expect(n).toBe(3)
        })

    })
    

})
