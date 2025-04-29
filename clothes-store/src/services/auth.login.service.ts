import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResetTokenResponseModule } from '../modules/resetPassword.module';
import { login, registering } from '../modules/login.module';



@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  api = environment.api

  private http = inject(HttpClient)

  
  constructor() { 
    this.checkIfIsLogged()
    this.getUser()
    
  }


  private isAuth = new BehaviorSubject<boolean>(this.hasToken())
  isAuthenticated$ = this.isAuth.asObservable()

  private accessToken$ = new BehaviorSubject<string | null>(null)

  private IsDeveloper = new BehaviorSubject<boolean>(false)
  IsDeveloper$ = this.IsDeveloper.asObservable()

  // PAGE ACCESS
  private allowPageAccess = false
  private pagePayment = false

  register(form: registering): Observable<string>{
    return this.http.post<string>(`${this.api}/addingUser`, form)
  }



  gettingIn(credentials: {form: login}): Observable<{accessToken: string, developerMsg: string}>{
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




  loggingOut(){ //<string>
    this.http.post(`${this.api}/auth/logout`, {}, {withCredentials: true})
    .subscribe({
      next: () => this.logOut() ,

      error: (err) => {
        console.log('Logout Failed!')
        alert('Logout Failed!')
      }
  
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



  // checks if logged every time u load the components

  checkIfIsLogged(){
    this.http.get<{developerMsg: string}>(`${this.api}/isLogged`, { withCredentials: true }).subscribe({
      next: (res) => {
        
        if(res.developerMsg == 'Developer_Logged'){
          this.IsDeveloper.next(true)
        }else{
          this.IsDeveloper.next(false)
        }
        console.log('Logged!')
      },

      error: () => {
        this.logOut()  
        console.log('No Logged!')      
      }

    })
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


  // PAGE ACCESS

  setPageAccess(status: boolean){
    this.allowPageAccess = status
  }

  
  getPageAccess(): boolean{
    return this.allowPageAccess
  }


  setPaymentPageAccess(status: boolean){
    this.pagePayment = status
  }

  getPaymentPageAccess(): boolean{
    return this.pagePayment
  }






   // NOT IN USE
  emailValidator(email: string):Observable<string>{
    return this.http.post<string>(`${this.api}/emailValidation`, {email})
  }
  

}
