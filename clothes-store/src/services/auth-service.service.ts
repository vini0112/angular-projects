import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private http = inject(HttpClient)

    api = environment.api
  

  constructor() {
  }

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
    const refreshToken = this.getAccessToken()

    if(!refreshToken){
      throw new Error('Refresh token not found!')
    }

    return this.http.post<any>(`${this.api}/refreshToken`, {}, {withCredentials: true}).pipe(
      tap((res) => {
        
        console.log('Access token created!')
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
