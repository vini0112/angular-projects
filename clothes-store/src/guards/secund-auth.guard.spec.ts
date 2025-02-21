import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { secundAuthGuard } from './secund-auth.guard';

describe('secundAuthGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => secundAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
