import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  private api = environment.api
  http = inject(HttpClient)
  constructor() { }


  sendAuth0Token(idToken: any, user: any): Observable<any>{
    return this.http.post(`${this.api}/auth0/token`, {token: idToken,
    user: user})
  }

}
