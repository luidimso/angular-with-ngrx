import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

//Effects is to do side effects after a action is dispatched
//For exemple: save on local storage the login authentication after the login action be dispatched
//The effect may only be declared on the module (EffectsModule.forFeature)
@Injectable()
export class AuthEffects {
    constructor(
        private action$: Actions
    ) {
        action$.subscribe(action => {
            switch(action.type) {
                case "[Login Page] User Login":
                    console.log("Login Side Effect");
                    localStorage.setItem("user", JSON.stringify(action["user"]));
            }
        });
    }
}