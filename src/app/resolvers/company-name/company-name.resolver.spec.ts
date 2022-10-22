import { TestBed } from '@angular/core/testing';

import { CompanyNameResolver } from './company-name.resolver';

describe('CompanyNameResolver', () => {
  let resolver: CompanyNameResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyNameResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
