import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { of } from 'rxjs';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(), 
        provideRouter(routes),
        importProvidersFrom(SocketIoModule.forRoot(config)),
        
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


      ]
    }).compileComponents();
  });



  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  



});
