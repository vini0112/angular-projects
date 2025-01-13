import { TestBed } from '@angular/core/testing';

import { ProductsMascService } from './products-masc.service';

describe('ProductsMascService', () => {
  let service: ProductsMascService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsMascService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
