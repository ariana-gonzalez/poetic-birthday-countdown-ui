import { TestBed } from '@angular/core/testing';

import { CountdownPersistanceService } from './countdown-persistance.service';

describe('CountdownPersistanceService', () => {
  let service: CountdownPersistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountdownPersistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
