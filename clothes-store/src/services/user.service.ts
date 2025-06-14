import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { userDetailFromForm, userDetails } from '../modules/user.module';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  messageService = inject(MessageService)
  
  constructor(private http: HttpClient) {}
  
  private apiUrl = environment.api

  private userDetailBehaviorSubj = new BehaviorSubject<userDetails | null>(null)
  userDetail$ = this.userDetailBehaviorSubj.asObservable()

  
  getUserDetails(){
    this.http.get<userDetails>(`${this.apiUrl}/user-info`).subscribe({
      next: (res) =>{
        console.log('User data received!')
        this.userDetailBehaviorSubj.next(res)
      },
      error: (err) =>{
        console.log('Error detail: ',err)
      }

    })

  }



  updateUserDetails(userDetail: userDetailFromForm){
    this.http.put(`${this.apiUrl}/user-update`, {userDetail: userDetail}).subscribe({
      next: () =>{
        this.messageService.showMessage('User Address updated!', 'success')

        const currentUserAddress = this.userDetailBehaviorSubj.value

        this.userDetailBehaviorSubj.next({
          ...currentUserAddress!,
          email: userDetail.email!,
          username: userDetail.username!,
          address: {
              country: userDetail.country,
              street: userDetail.street,
              houseNumber: userDetail.houseNumber,
              city: userDetail.city,
              zipCode: userDetail.zipCode,
              state: userDetail.state,
              apartment: userDetail.apartment
          }
        })
        
      },
      error: (err) =>{
        this.messageService.showMessage('Error edeting the user address!', 'error')
        console.log('Error: ', err)
      }
    })

  }


}
