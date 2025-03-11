import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-tools',
  imports: [RouterOutlet, NgIf],  //
  templateUrl: './all-tools.component.html', 
  styleUrl: './all-tools.component.css'
})
export default class AllToolsComponent {
  route = inject(Router)

  warehouse(){
    this.route.navigate(['developer_side/productmanagement'])
  }

  isChildRouteActive(): boolean{
    return this.route.url !== '/developer_side'
  }

}
