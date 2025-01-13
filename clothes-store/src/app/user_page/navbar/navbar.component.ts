import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  isAsideOpen = false

  openCart(){
    this.isAsideOpen = !this.isAsideOpen
  }
  btnCloseCart(){
    this.isAsideOpen = false
  }
  btnXcloseCart(){
    this.isAsideOpen = false
  }



}
