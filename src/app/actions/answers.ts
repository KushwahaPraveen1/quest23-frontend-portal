import { Action } from './index';
import { Answer } from '../models/answer';

export enum AnswersAction {
  INITIALIZE_ANSWERS = '[Answers] initialize',
  UPDATE_ANSWER = '[Answer] update'
}

export class InitializeAnswers implements Action {
  readonly type = AnswersAction.INITIALIZE_ANSWERS;

  constructor(public payload: Answer[]) {

  }
}

export class UpdateAnswer implements Action {
  readonly type = AnswersAction.UPDATE_ANSWER;

  constructor(public payload: Answer) {

  }
}
