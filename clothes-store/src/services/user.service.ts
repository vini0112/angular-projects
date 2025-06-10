import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { userDetails } from '../modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  
  private apiUrl = environment.api

  private userdetail = new BehaviorSubject<userDetails | null>(null)
  userDetail$ = this.userdetail.asObservable()

  // /user-update/:id
  
  getUserDetails(){
    this.http.get<userDetails>(`${this.apiUrl}/user-info`).subscribe({
      next: (res) =>{
        console.log('User data received!')
        this.userdetail.next(res)
      },
      error: (err) =>{
        console.log('Error detail: ',err)
      }

    })

  }



}
