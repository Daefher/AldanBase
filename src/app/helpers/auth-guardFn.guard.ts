import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/demo-login/authentication.service";
import { inject } from "@angular/core";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
        const authService = inject(AuthenticationService);
        const router = inject(Router);
        const currentUser = authService.currentUserValue;
        if(currentUser){
          return true;
        }
        router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);