import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./actions-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

//Effects is to do side effects after a action is dispatched
//For exemple: save on local storage the login authentication after the login action be dispatched
//The effect may only be declared on the module (EffectsModule.forFeature)
@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.action$.pipe(ofType(AuthActions.login), tap(action => {
            console.log("Login Side Effect");
            localStorage.setItem("user", JSON.stringify(action.user));
        }));
    }, {dispatch: false});

    logout$ = createEffect(() => {
        return this.action$.pipe(ofType(AuthActions.logout), tap(action => {
            console.log("Logout Side Effect");
            localStorage.removeItem("user");
            this.router.navigateByUrl("/login");
        }));
    }, {dispatch: false});

    constructor(
        private action$: Actions,
        private router: Router
    ) {}
}