import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../actions-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
};

// it is needed to inform how is the initial state of the data to store
export const initialAuthState: AuthState = {
  user: undefined
};

export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];


//reducer to show when and how the action was called
//this method is called every time when action is dispatched and loads the new version of the state on storage
//you can put one or more actions to map their actions
export const authReducer = createReducer(initialAuthState, on(AuthActions.login, (state, action) => {
  return {
    user: action.user
  };
}), on(AuthActions.logout, (state, action) => {
  return {
    user: undefined
  };
}));
