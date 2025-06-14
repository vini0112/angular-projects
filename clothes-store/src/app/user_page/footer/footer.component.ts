import { ChangeDetectionStrategy, Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthLoginService } from '../../../services/auth.login.service';
import { AsyncPipe, isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, AsyncPipe, NgIf],  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  authLoginService = inject(AuthLoginService)

  emailForContact = 'viniciuseloi10@gmail.com'

  isAuth$ = this.authLoginService.isAuthenticated$


}
