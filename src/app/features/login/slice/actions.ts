import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProduct from './reducer';


const getUserFeatureState = createFeatureSelector<fromProduct.UserState>('userFeature');

export const getUser = createSelector(
  getUserFeatureState,
  (state) => {
    return state.user;
  }
);


export const getErr = createSelector(
  getUserFeatureState,
  (state) => {
    return state.error;
  }
);

export enum UserAction {
  Login = '[User] Login',
  Register = '[User] Register',
  Load = '[User] Load',
  Err = '[User] Err',
}


export class Err implements Action {
  readonly type = UserAction.Err;

  constructor(public payload: { l: string, r: string }) {
  }
}

export class Load implements Action {
  readonly type = UserAction.Load;

  constructor(public payload: object) {
  }
}

export class Login implements Action {
  readonly type = UserAction.Login;

  constructor(public payload: object) {
  }
}


export class Register implements Action {
  readonly type = UserAction.Register;

  constructor(public payload: object) {
  }
}


export type LoginActions = Login | Register | Load | Err;


