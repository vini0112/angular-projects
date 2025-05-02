import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
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



  fit("Should get favorites products", () =>{
    const item = {id: 1, name: 'vina', price: 1, isFavorite: true, image: 'jkla', section: 'shoes', info: 'jk', sexo: 'kl', isBestseller: true, quantity: 4}

    component.favoriteProducts = [item]
    expect(component.favoriteProducts.length).toBeGreaterThan(0)

    fixture.detectChanges()  

    // card
    const card = fixture.debugElement.query(By.css('[data-testid="card"]'))
    expect(card).not.toBeNull()

    // checking if it has price
    const price = card.nativeElement.querySelector('.pricing')
    expect(price.textContent).not.toBeNull()
    
    
    


  })

});
