import { CustomersService } from './../services/customers.service';
import { TestBed, inject } from '@angular/core/testing';



describe('CustomersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomersService]
    });
  });

  it('should ...', inject([CustomersService], (service: CustomersService) => {
    expect(service).toBeTruthy();
  }));
});
