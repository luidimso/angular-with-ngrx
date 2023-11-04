import { createSelector } from "@ngrx/store";

//the createSelector method avoid to run its implementation again if the input (state[zuth]) has the same value of the last run
//the input value is stored in cache memory
export const isLoggedIn = createSelector(state => state["auth"], (auth) => !!auth.user);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);