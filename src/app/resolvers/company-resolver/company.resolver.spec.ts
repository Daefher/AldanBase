import { TestBed } from '@angular/core/testing';

import { CompanyResolver } from './company.resolver';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyResolver);
  });

  xit('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
