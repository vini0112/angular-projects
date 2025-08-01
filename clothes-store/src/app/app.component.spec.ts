import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { of } from 'rxjs';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';
import { provideAuth0 } from '@auth0/auth0-angular';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 

const configAuth0: SocketIoConfig = {
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
        },
        provideAuth0({
          domain: 'dev-mqk5g6s65qigreb3.us.auth0.com',
          clientId: 'xhYGNIDKx5rgmkcE4oslXSOE2aK6Ohmb',
          useRefreshTokens: true,
          useRefreshTokensFallback: true ,
          authorizationParams: {
            audience: 'clothe_store_api',
            redirect_uri:'http://localhost:4200'
          }
        })


      ]
    }).compileComponents();
  });



  it('should create the app', () => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });


  



});
