import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService } from '@auth0/angular-jwt'
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  api = environment.api

  private http = inject(HttpClient)
  
  constructor(private jwtHelper: JwtHelperService) { }


  emailValidator(email: string):Observable<string>{
    return this.http.post<string>(`${this.api}/emailValidation`, email)
  }

  register(form: string): Observable<string>{
    return this.http.post<string>(`${this.api}/addingUser`, form)
  }

  gettingIn(form: string): Observable<string>{
    return this.http.post<string>(`${this.api}/entrando`, form)
  }


  saveToken(token: string){
    localStorage.setItem('token', token)
  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('toke')
    return token ? !this.jwtHelper.isTokenExpired(token) : false
  }

  logOut(){
    localStorage.removeItem('token')
  }


}
