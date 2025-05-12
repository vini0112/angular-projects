import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment.development';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private http = inject(HttpClient)
  private messageService = inject(MessageService)



    api = environment.api
  

  getAccessToken(): string | null{
    return localStorage.getItem('accessToken')
  }

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
  }


  refreshToken(): Observable<any>{

    const accessToken = this.getAccessToken()

    if(!accessToken){
      throw new Error('Refresh token not found!')
    }

    return this.http.post<any>(`${this.api}/refreshToken`, {accessToken}, {withCredentials: true}).pipe(
      tap((res) => {
        
        this.messageService.showMessage("Token Refreshed! Try Again!", "info")
        if(res.accessToken){
          this.setAccessToken(res.accessToken)
        }
      })
    )
  }

  logout(): void {
    this.clearTokens();
    window.location.href = '/login'
  }

  



}
