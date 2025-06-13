import { TestBed } from '@angular/core/testing';

import { ValidateUserDetailsService } from './validate-user-details.service';

describe('ValidateUserDetailsService', () => {
  let service: ValidateUserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
