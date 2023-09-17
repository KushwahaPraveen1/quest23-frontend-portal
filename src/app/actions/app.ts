import { Action } from './index';
import { User } from '../models/user';

export enum AppActions {
  BOOTSTRAP = '[App] bootstrap',
  REGISTER_SENT = '[App] register sent',
  REGISTER_SUCCESS = '[App] register success',
  REGISTER_FAILED = '[App] register failed',
  LOGIN_SENT = '[App] login sent',
  LOGIN_SUCCESS = '[App] login success',
  LOGIN_FAILED = '[App] login failed',
  TEST_SUBMITTED = '[App] test submitted'
}

export class RegisterSent implements Action {
  readonly type = AppActions.REGISTER_SENT;
}

export class RegisterFailed implements Action {
  readonly type = AppActions.REGISTER_FAILED;
}

export class RegisterSuccess implements Action {
  readonly type = AppActions.REGISTER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LogInSent implements Action {
  readonly type = AppActions.LOGIN_SENT;
}

export class LogInFailed implements Action {
  readonly type = AppActions.LOGIN_FAILED;
}

export class LogInSuccess implements Action {
  readonly type = AppActions.LOGIN_SUCCESS;

  constructor(public payload: User) {
  }
}

export class AppBootstraped implements Action {
  readonly type = AppActions.BOOTSTRAP;
}

export class TestSubmitted implements Action {
  readonly type = AppActions.TEST_SUBMITTED;
}


