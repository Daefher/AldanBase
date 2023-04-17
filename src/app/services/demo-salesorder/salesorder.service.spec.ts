import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { SalesorderService } from './salesorder.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SalesorderService', () => {
  let service: SalesorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
    });
    service = TestBed.inject(SalesorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have getData function', () => {
    const service: SalesorderService = TestBed.inject(SalesorderService);
    expect(service.changeShowControls).toBeTruthy();
   });
});
