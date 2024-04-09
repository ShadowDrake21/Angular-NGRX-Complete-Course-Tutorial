import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { authoLogout, loginSuccess, signupSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state: any, action: any) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(authoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
