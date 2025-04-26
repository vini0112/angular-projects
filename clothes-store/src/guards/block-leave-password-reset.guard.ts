import { CanDeactivateFn } from '@angular/router';
import {ResetPasswordComponent} from '../app/user_page/reset-password/reset-password.component';

export const blockLeavePasswordResetGuard: CanDeactivateFn<ResetPasswordComponent> = (component, currentRoute, currentState, nextState) => {
  
  return false
};


// THIS GUARD DOESN'T ALLOW THE USER LEAVE OR ACCESS ANOTHER PART OF THE APP WHILE RESETING THE PASSWORD!

