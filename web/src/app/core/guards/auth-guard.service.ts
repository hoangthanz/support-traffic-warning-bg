import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      map((user) => {
        if (this.authService.isAuthenticated()) {
          return true;
        } else {
          this.router.navigate(['login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }
}
