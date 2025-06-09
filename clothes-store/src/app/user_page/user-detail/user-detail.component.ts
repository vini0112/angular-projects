import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{

  userService = inject(UserService)
  private route = inject(ActivatedRoute)

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

  userDetails$ = this.userService.userDetail$
  loading = true
  // userDetails$ = this.route.paramMap.pipe(
  //   switchMap(params => {
  //     const id = params.get('id')
  //     return this.userService.getUserDetails(parseInt(id!))
  //   })
  // )


  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id')
    // this.userService.getUserDetails(parseInt(id!))
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
