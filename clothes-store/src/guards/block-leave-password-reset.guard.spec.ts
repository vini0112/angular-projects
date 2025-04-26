import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { blockLeavePasswordResetGuard } from './block-leave-password-reset.guard';
import { ResetPasswordComponent } from '../app/user_page/reset-password/reset-password.component';

describe('blockLeavePasswordResetGuard', () => {

  let mockComponent: ResetPasswordComponent;
  let mockCurrentRoute: ActivatedRouteSnapshot;
  let mockCurrentState: RouterStateSnapshot;
  let mockNextState: RouterStateSnapshot;
  

  beforeEach(() => {
    mockComponent = {} as ResetPasswordComponent;
    mockCurrentRoute = {} as ActivatedRouteSnapshot;
    mockCurrentState = {} as RouterStateSnapshot;
    mockNextState = {} as RouterStateSnapshot;
  });

  it('should not allow navigation away (return false)', () => {
    const result = TestBed.runInInjectionContext(() =>
      blockLeavePasswordResetGuard(mockComponent, mockCurrentRoute, mockCurrentState, mockNextState)
    )

    expect(result).toBeFalse()

  });

});
