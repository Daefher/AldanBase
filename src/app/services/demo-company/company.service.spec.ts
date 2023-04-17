import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { CompanyService } from './company.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(CompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have getData function', () => {
    const service: CompanyService = TestBed.inject(CompanyService);
    expect(service.createCompanyPageData).toBeTruthy();
   });
});
