import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
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
import { provideAuth0 } from '@auth0/auth0-angular'

const config: SocketIoConfig = {
  url: environment.api,
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 

const isBrowser = typeof window !== 'undefined';


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

    provideAuth0({
      domain: 'dev-mqk5g6s65qigreb3.us.auth0.com',
      clientId: 'xhYGNIDKx5rgmkcE4oslXSOE2aK6Ohmb',
      useRefreshTokens: true,
      useRefreshTokensFallback: true ,
      authorizationParams: {
        audience: 'clothe_store_api',
        redirect_uri: isBrowser ? window.location.origin : 'http://localhost:4200'
      }
    }),

    
    
  ]
};
