import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject, catchError, from, Observable, of, Subject, tap } from 'rxjs';
import { ResetTokenResponseModule } from '../modules/resetPassword.module';
import {jwtDecode} from 'jwt-decode'



@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  api = environment.api

  private http = inject(HttpClient)
  
  constructor(private jwtHelper: JwtHelperService) { 
    this.getUser()
    this.checkIfIsLogged()
  }


  private isAuth = new BehaviorSubject<boolean>(this.hasToken())
  isAuthenticated$ = this.isAuth.asObservable()

  private accessToken$ = new BehaviorSubject<string | null>(null)

  private IsDeveloper = new BehaviorSubject<boolean>(false)
  IsDeveloper$ = this.IsDeveloper.asObservable()



  register(form: string): Observable<string>{
    return this.http.post<string>(`${this.api}/addingUser`, form)
  }



  gettingIn(credentials: {form: string}): Observable<{accessToken: string, developerMsg: string}>{
    return this.http.post<{accessToken: string, developerMsg: string}>(`${this.api}/entrando`, credentials, {withCredentials: true}).pipe(
      tap(response => {

        if(response.developerMsg === 'Developer_Logged!'){
          this.IsDeveloper.next(true)
        }

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
      next: () => this.logOut()
  
    })
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
    if(this.hasToken()) localStorage.removeItem('accessToken')
    
    this.isAuth.next(false)
    this.IsDeveloper.next(false)
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



  checkIfIsLogged(){
    this.http.get<{developerMsg: string}>(`${this.api}/isLogged`, { withCredentials: true }).subscribe({
      next: (res) => {

        if(res.developerMsg == 'Developer_Logged'){
          this.IsDeveloper.next(true)
        }else{
          this.IsDeveloper.next(false)
        }
      },
      error: () => {
        this.logOut()
      }

    })
  }



   // GETTING ROLE
  // getLoginRole(): string | null{
  //   let accessToken = null
  //   if(typeof window !== 'undefined'){
  //     accessToken = localStorage.getItem('accessToken')
  //   }

  //   if(!accessToken) return null

  //   try{
  //     const decoded: any = jwtDecode(accessToken)
      
  //     return decoded.role || null

  //   }catch(err){
  //     console.log("Decoding error!", err)
  //     return null
  //   }

  // }


  // checkingDevLogin(){
  //   const role = this.getLoginRole()
  //   if(role === 'developer'){
  //     this.IsDeveloper.next(true)
  //   }
  //   else{
  //     this.IsDeveloper.next(false)
  //   }

    
  // }




   // NOT IN USE
  emailValidator(email: string):Observable<string>{
    return this.http.post<string>(`${this.api}/emailValidation`, {email})
  }
  

}
