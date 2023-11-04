import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLoggedIn } from "./login/auth.selectors";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private stote: Store,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.stote.pipe(select(isLoggedIn), tap(loggedIn => {
            if(!loggedIn) {
                this.router.navigateByUrl('/login');
            }
        }));
    }
}