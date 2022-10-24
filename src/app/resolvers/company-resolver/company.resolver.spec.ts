import { TestBed } from '@angular/core/testing';

import { CompanyResolver } from './company.resolver';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
