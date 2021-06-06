import {LoginActions, UserAction} from './actions';

const error = {l: '', r: ''};

export interface UserState {
  user: object;
  loaded: boolean;
  error: { l: string, r: string };
}

const initialState: UserState = {
  user: undefined,
  loaded: false,
   error,
};

export function LoginReducer(state = initialState, action: LoginActions): UserState {
  switch (action.type) {
    case UserAction.Load: {
      return {
        user: action.payload, error, loaded: false
      };
    }
    case UserAction.Err: {
      console.error('Err ' + action.payload);
      return {
        user: null,
        error: action.payload,
        loaded: false
      };
    }
    default:
      return state;
  }
}


