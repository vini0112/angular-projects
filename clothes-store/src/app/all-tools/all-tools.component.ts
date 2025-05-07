import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-tools',
  imports: [RouterOutlet, NgIf],  //
  templateUrl: './all-tools.component.html', 
  styleUrl: './all-tools.component.css'
})
export class AllToolsComponent {
  route = inject(Router)

  warehouse(){
    this.route.navigate(['developer_side/productmanagement'])
  }

  dashborad(){
    this.route.navigateByUrl('developer_side/dashboard')
  }


  isChildRouteActive(): boolean{
    return this.route.url !== '/developer_side'
  }

}
