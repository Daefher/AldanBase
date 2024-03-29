import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


import { AuthenticationService } from '../services/demo-login/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router : Router,
    private authenticationService : AuthenticationService
  ){}
  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const currentUser = this.authenticationService.currentUserValue;
      if(currentUser){
        return true;
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
