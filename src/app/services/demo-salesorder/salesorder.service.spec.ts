import { TestBed } from '@angular/core/testing';

import { SalesorderService } from './salesorder.service';

describe('SalesorderService', () => {
  let service: SalesorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
