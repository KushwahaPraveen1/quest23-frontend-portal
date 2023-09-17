import { Member, User } from '../models/user';
import { Action } from '../actions';
import { AppActions } from '../actions/app';

export interface AppState {
  loggedInUser: User;
  isLoggedIn: boolean;
  loading: boolean;
  isBootstraped: boolean;
  isTestSubmitted: boolean;
}

export const initialState: AppState = {
  loggedInUser: null,
  isLoggedIn: false,
  loading: false,
  isBootstraped: null,
  isTestSubmitted: false,
};

export function appReducer(state: AppState = initialState, action: Action) {

  switch (action.type) {
    case AppActions.REGISTER_SENT:
      return {
        ...state,
        loading: true
      };
    case AppActions.REGISTER_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        loading: false
      };
    case AppActions.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        isBootstraped: true,
        loggedInUser: action.payload
      };
    case AppActions.LOGIN_SENT:
      return {
        ...state,
        loading: true
      };
    case AppActions.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        loading: false
      };
    case AppActions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        loggedInUser: action.payload
      };
    case AppActions.BOOTSTRAP:
      return {
        ...state,
        isBootstraped: true,
      };
    case AppActions.TEST_SUBMITTED:
      return {
        ...state,
        isTestSubmitted: true
      };
    default: {
      return state;
    }
  }
}

export const _getLoggedInUser = (state: AppState) => state.loggedInUser;
export const _getIsLoading = (state: AppState) => state.loading;
export const _getIsLoggedIn = (state: AppState) => state.isLoggedIn;
export const _getIsBootstraped = (state: AppState) => state.isBootstraped;
export const _getIsTestSubmitted = (state: AppState) => state.isTestSubmitted;

