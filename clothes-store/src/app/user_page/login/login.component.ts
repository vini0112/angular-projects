import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, NgClass],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  scrollBarTrigger = false
  scrollBack = true

  movingBarLogin(){
    this.scrollBarTrigger = false
    this.scrollBack = true
  }
  movingBarBack(){
    this.scrollBarTrigger = true
    this.scrollBack = false
    
  }

}
