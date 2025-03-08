import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject, catchError, from, Observable, of, Subject, tap } from 'rxjs';
import { ResetTokenResponseModule } from '../modules/resetPassword.module';



@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  api = environment.api

  private http = inject(HttpClient)
  
  constructor(private jwtHelper: JwtHelperService) { 
    this.getUser()
    
  }


  private isAuth = new BehaviorSubject<boolean>(this.hasToken())
  isAuthenticated$ = this.isAuth.asObservable()

  private accessToken$ = new BehaviorSubject<string | null>(null)


  register(form: string): Observable<string>{
    return this.http.post<string>(`${this.api}/addingUser`, form)
  }



  gettingIn(credentials: {form: string}): Observable<{accessToken: string}>{
    return this.http.post<{accessToken: string}>(`${this.api}/entrando`, credentials, {withCredentials: true}).pipe(
      tap(response => {
        this.saveToken(response.accessToken),
        this.accessToken$.next(response.accessToken)
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




  getAccessToken(): string | null {
    return this.accessToken$.value;
  }

  // implementation with localStorage 

  private saveToken(accessToken: string){
    localStorage.setItem('accessToken', accessToken)
    this.isAuth.next(true)
  }
  
  hasToken(): boolean{
    if(typeof window !== 'undefined'){
      return !!localStorage.getItem('accessToken')
    }
    return false
  }

  private loadToken(){
    if(this.hasToken()){
      this.isAuth.next(true)
    }
  }
  
  logOut(){
    this.accessToken$.next(null)
    localStorage.removeItem('accessToken')
    this.isAuth.next(false)
  }

  // reseting password

  sendEmailToReset(email: string): Observable<string>{
    return this.http.post<string>(`${this.api}/request/reset`, {email})
  }
  
  resetingPassword(newPassword: string, token: string): Observable<string>{
    return this.http.post<string>(`${this.api}/reset-password`, {newPassword, token})
  }
  

  tokenResetPasswordValidator(token: string): Observable<ResetTokenResponseModule>{
    return this.http.get<ResetTokenResponseModule>(`${this.api}/validatorTokenResetPassword/${token}`)
  }




   // nao em uso
  emailValidator(email: string):Observable<string>{
    return this.http.post<string>(`${this.api}/emailValidation`, {email})
  }
  

}
