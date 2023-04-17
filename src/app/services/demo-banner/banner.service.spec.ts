import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { BannerService } from './banner.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('BannerService', () => {
  let service: BannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ActivatedRoute],
    });
    service = TestBed.inject(BannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: BannerService = TestBed.inject(BannerService);
    expect(service.create).toBeTruthy();
   });
});
