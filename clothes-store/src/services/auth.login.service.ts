import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject, from, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  api = environment.api

  private http = inject(HttpClient)
  
  constructor(private jwtHelper: JwtHelperService) { 
    this.getUser()
    // this.loadToken()
  }


  private isAuth = new BehaviorSubject<boolean>(this.hasToken())
  isAuthenticated$ = this.isAuth.asObservable()

  emailValidator(email: string):Observable<string>{
    return this.http.post<string>(`${this.api}/emailValidation`, {email})
  }

  register(form: string): Observable<string>{
    return this.http.post<string>(`${this.api}/addingUser`, form)
  }


  gettingIn(credentials: {form: string}): Observable<string>{
    return this.http.post<string>(`${this.api}/entrando`, credentials, {withCredentials: true})
    .pipe(
      tap(() =>{
        this.saveToken()
      })
    )
  }

  private getUser(){
    this.http.get<{authenticated: boolean}>(`${this.api}/auth/user`, {withCredentials: true})
    .subscribe({
      next: () => this.loadToken(),

      error: () => `No Token`
    })
  }

  loggingOut(){
    this.http.post<string>(`${this.api}/auth/logout`, {}, {withCredentials: true})
    .subscribe({
      next: () => this.logOut(),
  
    })
  }



  // implementation with localStorage 

  private saveToken(){
    localStorage.setItem('token', 'true')
    this.isAuth.next(true)
  }
  
  hasToken(): boolean{
    if(typeof window !== 'undefined'){
      return !!localStorage.getItem('token')
    }
    return false
  }

  private loadToken(){
    if(this.hasToken()){
      this.isAuth.next(true)
    }
  }
  
  logOut(){
    localStorage.removeItem('token')
    this.isAuth.next(false)
  }

  // reseting password
  sendEmailToReset(email: string): Observable<string>{
    return this.http.post<string>(`${this.api}/request/reset`, {email})
  }
  


}
