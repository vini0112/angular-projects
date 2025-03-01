import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { blockLeavePasswordResetGuard } from './block-leave-password-reset.guard';

describe('blockLeavePasswordResetGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blockLeavePasswordResetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
