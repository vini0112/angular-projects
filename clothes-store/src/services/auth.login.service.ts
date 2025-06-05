import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResetTokenResponseModule } from '../modules/resetPassword.module';
import { login, registering } from '../modules/login.module';
import { LocalStorageService } from './localStorage.service';
import { SocketService } from './socket.service';



@Injectable({
  providedIn: 'root'
})
export class AuthLoginService{  

  api = environment.api
  private http = inject(HttpClient)
  localstorageService = inject(LocalStorageService)
  socketService = inject(SocketService) 

  
  

  private isAuth = new BehaviorSubject<boolean>(false)
  isAuthenticated$ = this.isAuth.asObservable()


  private IsDeveloper = new BehaviorSubject<boolean>(false)
  IsDeveloper_authentication$ = this.IsDeveloper.asObservable()




  // PAGE ACCESS
  private accessToForm_shipping_and_Payment = false

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

        this.saveToken(response.accessToken)
        this.isAuth.next(true)
        this.socketService.onConnect()
        
      })
    )
  }


  sendAuth0Token(idToken: any): Observable<any>{
    return this.http.post(`${this.api}/auth0/token`, {token: idToken}, {withCredentials: true}).pipe(
      tap((response: any) =>{
        
        if(response.userMsg){
          this.isAuth.next(true)
          this.saveToken(response.accessToken)
          this.socketService.onConnect()
        }
      })
    )

  }


  loggingOut(){
    this.http.post<string>(`${this.api}/auth/logout`, {}, {withCredentials: true})
    .subscribe({
      next: (res: any) => {
        console.log(res.message)
        this.logOut()
        this.socketService.disconnectedUser()
      },

      error: (err) => {
        console.log('Logout Failed!')
        alert('Logout Failed!')
      }
  
    })
  }


  // called in the app component

  checkIfIsLogged(){
    
    this.http.get(`${this.api}/isLogged`, { withCredentials: true }).subscribe({
      next: (res: any) =>{
        
        if(res.message === 'Developer_Logged'){
          this.IsDeveloper.next(true)
          this.isAuth.next(true)
          console.log('DEV LOGGED')
          this.socketService.onConnect()
        }

        else if(res.message === 'User_Logged'){
          this.isAuth.next(true)
          console.log('USER LOGGED')
          this.socketService.onConnect()
        }

        else{
          console.log(res.message)
          this.isAuth.next(false)
        }
        
      },
      error: (err) =>{
        console.log("ERROR in isLogged: ", err)
      }
    })
  }



  // implementation with localStorage 

  private saveToken(accessToken: string){
    localStorage.setItem('accessToken', accessToken)
  }
  

  private hasToken(): boolean{
    if(typeof window !== 'undefined'){
      return !!localStorage.getItem('accessToken') // return true if it's a string
    }

    return false    
  }


  private logOut(){
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

  

  // PAGE ACCESS TO SHIPPING FORM AND PAYMENT FORM TO BUY SOMETHING

  setPageAccess(status: boolean){
    this.accessToForm_shipping_and_Payment = status
  }

  
  getPageAccess(): boolean{
    return this.accessToForm_shipping_and_Payment
  }



  

}
