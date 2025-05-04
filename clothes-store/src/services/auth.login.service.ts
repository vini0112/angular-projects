import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResetTokenResponseModule } from '../modules/resetPassword.module';
import { login, registering } from '../modules/login.module';
import { LocalStorageService } from './localStorage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthLoginService implements OnInit{  

  api = environment.api
  private http = inject(HttpClient)
  localstorageService = inject(LocalStorageService)

  
  constructor() { 
    
    // if(!this.isAuth.value){
    //   
    // }

  }

  ngOnInit(): void {
    
    // console.log('heere ', this.isAuth.value)
    // console.log(this.IsDeveloper.value)
  }

  // STATUS OF AUTHENTICATION
  private isAuth = new BehaviorSubject<boolean>(this.hasToken())
  isAuthenticated$ = this.isAuth.asObservable()

  // STATUS OF DEV AUTHENTICATION
  private IsDeveloper = new BehaviorSubject<boolean>(false)
  IsDeveloper$ = this.IsDeveloper.asObservable()

  // 
  private accessToken$ = new BehaviorSubject<string | null>(null)



  // PAGE ACCESS
  private allowPageAccess = false
  private pagePayment = false

  register(form: registering): Observable<string>{
    return this.http.post<string>(`${this.api}/addingUser`, form)
  }



  gettingIn(credentials: {form: login}): Observable<{accessToken: string, developerMsg: string}>{
    return this.http.post<{accessToken: string, developerMsg: string}>(`${this.api}/entrando`, credentials, {withCredentials: true})
    .pipe(
      tap(response => {
        
        if(response.developerMsg === 'Developer_Logged!'){
          this.IsDeveloper.next(true)
        }

        this.saveToken(response.accessToken),
        this.accessToken$.next(response.accessToken)
        
      })
    )
  }





  loggingOut(){
    this.http.post<string>(`${this.api}/auth/logout`, {}, {withCredentials: true})
    .subscribe({
      next: (res: any) => {
        console.log(res.message)
        this.logOut()
      },

      error: (err) => {
        console.log('Logout Failed!')
        alert('Logout Failed!')
      }
  
    })
  }



   // checks if logged every time u load the components

  checkIfIsLogged(){
    // debugger
    // console.log(this.IsDeveloper.value)

    this.http.get(`${this.api}/isLogged`, { withCredentials: true }).subscribe({
      next: (res) =>{
        console.log(res)
      },
      error: (err) =>{
        console.log('failed')
        
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
      return !!localStorage.getItem('accessToken') // return true if it's a string
    }

    return false    
  }


  // private loadToken(){
  //   if(this.hasToken()){
  //     this.isAuth.next(true)
  //   }

  //   return false
  // }
  


  logOut(){
    // this.accessToken$.next(null)
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
