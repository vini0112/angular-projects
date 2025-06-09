import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  userForm: FormGroup

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




  readOnlyInputs = true
  editionMode = false


  editUserInfoButton(){
    this.editionMode = true
    this.readOnlyInputs = false
  }

  saveEditionButton(){
    this.editionMode = false
    this.readOnlyInputs = true

  }

}
