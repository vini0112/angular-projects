import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userDetailGuard } from './user-detail.guard';

describe('userDetailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userDetailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
