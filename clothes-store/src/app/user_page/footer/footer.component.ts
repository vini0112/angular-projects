import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthLoginService } from '../../../services/auth.login.service';
import { AsyncPipe, isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, AsyncPipe, NgIf],  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  authLoginService = inject(AuthLoginService)
  // plataformId = inject(PLATFORM_ID)

  emailForContact = 'viniciuseloi10@gmail.com'

  isAuth$ = this.authLoginService.isAuthenticated$

  // constructor(private router: Router, @Inject(PLATFORM_ID) private plataformId: Object){

  //   this.router.events.subscribe(event =>{
  //     if(event instanceof NavigationEnd && isPlatformBrowser(this.plataformId)){
  //         window.scrollTo(0, 0)
  //     }
  //   })

  // }




}
