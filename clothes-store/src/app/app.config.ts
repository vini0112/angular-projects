import { ApplicationConfig, importProvidersFrom, inject, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loginInterceptor } from '../interceptor/login.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptorToken } from '../interceptor/refresh-token.interceptor';
import {provideNgxStripe} from 'ngx-stripe'
import { environment } from '../environments/environment.development';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io'
import {AuthModule, provideAuth0} from '@auth0/auth0-angular'
import { isPlatformBrowser } from '@angular/common';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 

// const platformId = inject(PLATFORM_ID);



export const appConfig: ApplicationConfig = {
  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),

    provideHttpClient(
      withFetch(),
      withInterceptors([loginInterceptor, AuthInterceptorToken]), 
    ),
    provideNgxStripe(environment.stripe_public_key),

    {provide: JWT_OPTIONS, useValue: {}},
    JwtHelperService,    

    importProvidersFrom(
      SocketIoModule.forRoot(config), 
    ),

    (typeof window !== 'undefined' ? [
        provideAuth0({
          domain: 'dev-mqk5g6s65qigreb3.us.auth0.com',
          clientId: 'xhYGNIDKx5rgmkcE4oslXSOE2aK6Ohmb',
          authorizationParams: { 
            redirect_uri: window.location.origin,
            audience: 'clothe-store-api', 
          }
        }) 

    ] : []) 
  

    
    
    //isPlatformBrowser(platformId) ? window.location.origin : ''typeof window !== 'undefined' ? window.location.origin : ''
    
  ]
};
