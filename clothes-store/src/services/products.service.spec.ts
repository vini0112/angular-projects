import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, provideHttpClient(), provideHttpClientTesting()]
    });


    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController)
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it("Should get all the products", () =>{
    spyOn(console, 'log')

    let products = [{id: 1, name: 'vini', price: 123, isFavorite: true, image: 'jk', section: 'short', info: 'lkfja', sexo: 'masc', isBestseller: true, quantity: 4}]

    service.getProducts()

    const req = httpMock.expectOne(req => req.url.endsWith('/clothes'))
    expect(req.request.method).toBe("GET")
    req.flush(products)

    service.allProducts$.subscribe(res => expect(res).toEqual(products))
    expect(console.log).toHaveBeenCalledWith('Products received!')

  })

  it("Should fail getting the products", () =>{

    spyOn(console, 'log')
    service.getProducts()

    const req = httpMock.expectOne(req => req.url.endsWith('/clothes'))
    expect(req.request.method).toBe("GET")
    req.flush("Failed!", {status: 500, statusText: "Internal server error"})

    expect(console.log).toHaveBeenCalledWith('ERROR getting the products! ', 'Http failure response for http://www.localhost:3000/clothes: 500 Internal server error')

  })


  it("Should update clothes to favorite/unfavorite", () =>{

    const status = false 

    service.updateFavorite(1, true).subscribe(res => {
      expect(res).toBeFalse()
    })

    const req = httpMock.expectOne(req => req.url.endsWith('/clothesFavorite/1'))
    expect(req.request.method).toBe("PATCH")
    req.flush(status)

  })


  it("Create a new product", () =>{

    const mockFile = new File(['dummy'], 'product.jpg', { type: 'image/jpeg' });

    let product = {name: 'vini', price: 123, image: mockFile, section: 'short', info: 'lkfja', sexo: 'masc', quantity: 4}

    service.createProduct(product).subscribe(res =>{
      console.log(res)
      expect(res).toEqual(product)
    })

    const req = httpMock.expectOne(req => req.url.endsWith('/create-clothes'))
    expect(req.request.method).toBe('POST')
    req.flush(product)


    const getReq = httpMock.expectOne(req => req.url.endsWith('/clothes'));
    expect(getReq.request.method).toBe('GET');
    getReq.flush([]);

  })


  it("Should update the product", () =>{
    let product = {id: 1, name: 'vini', price: 123, isFavorite: true, image: 'jk', section: 'short', info: 'lkfja', sexo: 'masc', isBestseller: true, quantity: 4}

    let product2 = {id: 1, name: 'vinicius', price: 123, isFavorite: true, image: 'jk', section: 'short', info: 'lkfja', sexo: 'masc', isBestseller: true, quantity: 4}

    service.updateProduct(product).subscribe(res => {
      expect(res.name).toBe('vinicius')
    })

    const req = httpMock.expectOne(req => req.url.endsWith('/clothes/1'))
    expect(req.request.method).toBe('PUT')
    req.flush(product2)

  })

  it("Should delete a product", () =>{
    spyOn(console, 'log')
    service.deleteProduct(1)

    const req = httpMock.expectOne(req => req.url.endsWith('/clothes/1'))
    expect(req.request.method).toBe('DELETE')
    req.flush([])

    expect(console.log).toHaveBeenCalledWith('Product Deleted')
  })


  afterEach(() => {
    httpMock.verify();
  });


});
