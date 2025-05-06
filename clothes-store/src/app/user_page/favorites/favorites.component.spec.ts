import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import { of } from 'rxjs';

fdescribe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  // let spyProductService: jasmine.SpyObj<ProductsService>


  beforeEach(async () => {
    // spyProductService = jasmine.createSpyObj('ProductsService', ['getProducts'])

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        // {provide: ProductsService, useValue: spyProductService},
      ],
      imports: [FavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });



  xit("Should get favorites products", () =>{
    // const items = [
    //   {id: 1, name: 'vina', price: 1, isFavorite: true, image: 'jkla', section: 'shoes', info: 'jk', sexo: 'kl', isBestseller: true, quantity: 4},
    //   {id: 1, name: 'vii', price: 49, isFavorite: false, image: 'jkla', section: 'shirt', info: 'jk', sexo: 'kl', isBestseller: true, quantity: 43}
    // ]


    // spyProductService.getProducts.and.returnValue(of(items))

    // fixture.detectChanges()

    // expect(spyProductService.getProducts).toHaveBeenCalled()

  })

  

});
