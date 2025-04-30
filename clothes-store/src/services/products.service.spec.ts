import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProductsService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
