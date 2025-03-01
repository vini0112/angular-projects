import { CanDeactivateFn } from '@angular/router';
import ResetPasswordComponent from '../app/user_page/reset-password/reset-password.component';

export const blockLeavePasswordResetGuard: CanDeactivateFn<ResetPasswordComponent> = (component, currentRoute, currentState, nextState) => {
  // return component.blockLeavePasswordResetPage ? true : confirm('cannot do that')
  return false
};
