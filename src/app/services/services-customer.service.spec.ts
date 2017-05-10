import { TestBed, inject } from '@angular/core/testing';

import { ServicesCustomerService } from './services-customer.service';

describe('ServicesCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesCustomerService]
    });
  });

  it('should ...', inject([ServicesCustomerService], (service: ServicesCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
