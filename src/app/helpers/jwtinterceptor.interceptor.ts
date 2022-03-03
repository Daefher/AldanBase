import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/demo-login/authentication.service';


@Injectable()
export class JWTInterceptorInterceptor implements HttpInterceptor {

  constructor( private authenticationService: AuthenticationService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser && currentUser.jwt){
      request = request.clone({
        setHeaders : {
          Authorization: `Bearer ${currentUser.jwt}`
        }
      });
    }
    return next.handle(request);
  }
}
