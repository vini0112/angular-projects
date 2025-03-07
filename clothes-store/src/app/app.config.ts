import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { loginInterceptor } from '../interceptor/login.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptorToken } from '../interceptor/refresh-token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([loginInterceptor, AuthInterceptorToken]),
      withInterceptorsFromDi()
    ),
    {provide: JWT_OPTIONS, useValue: {}}, 
    JwtHelperService,
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}

  ]
};
