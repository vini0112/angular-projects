import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CheckoutPaymentComponent } from './checkout-payment.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 


describe('CheckoutPaymentComponent', () => {
  let component: CheckoutPaymentComponent;
  let fixture: ComponentFixture<CheckoutPaymentComponent>;
  


  beforeEach(async () => {

    

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        importProvidersFrom(SocketIoModule.forRoot(config)),
        
      ],
      imports: [CheckoutPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPaymentComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });



  it('should create', async() => {
    expect(component).toBeTruthy();
  });


  
  


});
