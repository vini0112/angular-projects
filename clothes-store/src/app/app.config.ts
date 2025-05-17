import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loginInterceptor } from '../interceptor/login.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptorToken } from '../interceptor/refresh-token.interceptor';
import {provideNgxStripe} from 'ngx-stripe'
import { environment } from '../environments/environment.development';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([loginInterceptor, AuthInterceptorToken]), 
    ),
    provideNgxStripe(environment.stripe_public_key),
    {provide: JWT_OPTIONS, useValue: {}}, 
    JwtHelperService,    

  ]
};
