import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, of } from 'rxjs';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import { AuthLoginService } from '../../../services/auth.login.service';
import { By } from '@angular/platform-browser';



describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let spyListCartService: jasmine.SpyObj<listCartServices>
  let cart = new BehaviorSubject<cartList[]>([])
  let isAuth = new BehaviorSubject<boolean>(false)
  let IsDeveloper = new BehaviorSubject<boolean>(false)
  let spyAuthLoginService: jasmine.SpyObj<AuthLoginService>

  beforeEach(async () => {

    spyListCartService = jasmine.createSpyObj('listCartServices', ['getFromLocalStorage'], 
      {
        cart$: cart.asObservable()
      }
    )

    cart.next(
      [
        {
          id: 1,
          name: 'vina',
          image: 'jl',
          quantity: 1,
          price: 123,
          cart_quantity: 1
        }
      ]
    )


    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: (key: string) => null,
              },
                queryParamMap: {
                get: (key: string) => null,
              }
            }
          }
        }
      ],
      imports: [NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Should check if products array received the data", () =>{  

    spyListCartService.cart$.subscribe(items =>{
      
      component.products = items
    })   

    fixture.detectChanges()

    expect(component.products).not.toBeUndefined()        
  })


  it('Should receive total_price and total_quantity of products', () =>{

    // ARRANGE
    component.totalPriceCart$ = spyListCartService.cart$.pipe(
      map(items => items.reduce((sum, n) => sum + n.price, 0))
    )

    component.totalQuantityProducts_inCart$ = spyListCartService.cart$.pipe(
      map(items => items.reduce((sum, n) => sum + n.cart_quantity!, 0))
    )

    // ACT
    fixture.detectChanges()


    // ASSERT
    component.totalPriceCart$.subscribe(n => expect(n).toBe(123))
    
    component.totalQuantityProducts_inCart$.subscribe(n => expect(n).toBe(1))


  })



  it('Should check some icons modifications after authentication', () =>{

    // ARRANGE

    spyAuthLoginService = jasmine.createSpyObj('AuthLoginService', [''],
      {
        isAuthenticated$: isAuth.asObservable()
      }
    )
    isAuth.next(true)

    component.isAuthenticated$ = spyAuthLoginService.isAuthenticated$

    // ACT
    fixture.detectChanges()

    const loginBtn = fixture.debugElement.query(By.css('[data-testid="loginBTN"]'))
    const logoutBtn = fixture.debugElement.query(By.css('[data-testid="logouIcon"]'))

    // ASSERT

    component.isAuthenticated$.subscribe(status => expect(status).toBeTrue())
    expect(loginBtn).toBeNull()
    expect(logoutBtn).toBeTruthy()
    
  })


  it("Should check if dev icon is active after dev_authentication", () =>{

    // ARRANGE

    spyAuthLoginService = jasmine.createSpyObj('AuthLoginService', [''],
      {
        isAuthenticated$: isAuth.asObservable(),
        IsDeveloper_authentication$: IsDeveloper.asObservable()
      }
    )

    isAuth.next(true)
    IsDeveloper.next(true)

    component.isAuthenticated$ = spyAuthLoginService.isAuthenticated$
    component.DEV_logged$ = spyAuthLoginService.IsDeveloper_authentication$

    // ACT 
    fixture.detectChanges()

    const loginBtn = fixture.debugElement.query(By.css('[data-testid="loginBTN"]'))
    const logoutBtn = fixture.debugElement.query(By.css('[data-testid="logouIcon"]'))
    const devIconBtn = fixture.debugElement.query(By.css('[data-testid="devIcon"]'))


    // ASSERT
    component.isAuthenticated$.subscribe(status => expect(status).toBeTrue())
    expect(loginBtn).toBeNull()
    expect(logoutBtn).toBeTruthy()
    expect(devIconBtn).toBeTruthy()

  })


});
