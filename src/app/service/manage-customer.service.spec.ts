import { TestBed } from '@angular/core/testing';

import { ManageCustomerService } from './manage-customer.service';

describe('ManageCustomerService', () => {
  let service: ManageCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
