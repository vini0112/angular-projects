import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { finalize, shareReplay, tap } from 'rxjs';
import { MessageService } from '../../../services/message.service';


@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{

  userService = inject(UserService)
  messageService = inject(MessageService)

  userForm: FormGroup
  loading = true
  
  

  userDetails$ = this.userService.userDetail$.pipe(
    tap(user =>{
      this.userForm.patchValue({
        username: user?.username,
        email: user?.email,
        country: user?.address.country,
        street: user?.address.street,
        houseNumber: user?.address.houseNumber === 0 ? null : user?.address.houseNumber,
        city: user?.address.city,
        zipCode: user?.address.zipCode === 0 ? null : user?.address.zipCode,
        state: user?.address.state,
        apartment: user?.address.apartment
      })
    }),

    shareReplay(1)
  )
  


  constructor(private fb: FormBuilder){

    this.userForm = fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      country: [null, [Validators.required]],
      street: [null, [Validators.required]],
      houseNumber: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      state: [null, [Validators.required]],
      apartment: [null, [Validators.required]],
    })


  }


  ngOnInit(): void {

  }


  
  get username(){
    return this.userForm.controls['username']
  }
  get email(){
    return this.userForm.controls['email']
  }
  get country(){
    return this.userForm.controls['country']
  }
  get street(){
    return this.userForm.controls['street']
  }
  get houseNumber(){
    return this.userForm.controls['houseNumber']
  }
  get city(){
    return this.userForm.controls['city']
  }
  get zipCode(){
    return this.userForm.controls['zipCode']
  }
  get state(){
    return this.userForm.controls['state']
  }
  get apartment(){
    return this.userForm.controls['apartment']
  }
  




  readOnlyInputs = true
  editionMode = false


  editUserInfoButton(){
    this.editionMode = true
    this.readOnlyInputs = false
  }


  saveEditionButton(){

    if(this.userForm.invalid){
      this.messageService.showMessage('Fill all the fields!', "error")
      return
    }
    this.userService.updateUserDetails(this.userForm.value)
    this.editionMode = false
    this.readOnlyInputs = true
  }

}
