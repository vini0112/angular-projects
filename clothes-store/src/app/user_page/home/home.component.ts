import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  navigateByTheme = [
    {
      image: '../assets/homeImgs/short-jeans.png',
      nameNavigationTo: 'See Shorts'
    },
    {
      image: '../assets/homeImgs/jaqueta.png',
      nameNavigationTo: 'See Jackets'

    },
    {
      image: '../assets/homeImgs/camisa.png',
      nameNavigationTo: 'See Shirts'

    },
    {
      image: '../assets/homeImgs/tenis.png',
      nameNavigationTo: 'See Sneakers'

    }
  ]

  

}
