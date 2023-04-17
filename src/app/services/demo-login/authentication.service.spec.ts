import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have getData function', () => {
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    expect(service.login).toBeTruthy();
   });
});
