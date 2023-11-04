import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers";

// a featureSelector queries a property and gives a type for it
export const selectAuthState = createFeatureSelector<AuthState>("auth");

//the createSelector method avoid to run its implementation again if the input (state[zuth]) has the same value of the last run
//the input value is stored in cache memory
export const isLoggedIn = createSelector(selectAuthState, (auth) => !!auth.user);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);