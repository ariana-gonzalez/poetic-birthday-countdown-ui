import { TestBed } from '@angular/core/testing';

import { ServiceCallerService } from './service-caller.service';

describe('ServiceCallerService', () => {
  let service: ServiceCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
