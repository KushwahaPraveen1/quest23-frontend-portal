import { Action } from './index';
import { Question } from '../models/question';

export enum QuestionActions {
  FETCH_QUESTIONS = '[Questions] fetch questions',
  FETCH_QUESTIONS_SUCCESS = '[Questions] fetch questions success',
  FETCH_QUESTIONS_FAILED = '[Questions] fetch questions failed',
}

export class FetchQuestions implements Action {
  readonly type = QuestionActions.FETCH_QUESTIONS;
}

export class FetchQuestionsSuccess implements Action {
  readonly type = QuestionActions.FETCH_QUESTIONS_SUCCESS;

  constructor(public payload: Question[]) {

  }
}

export class FetchQuestionsFailed implements Action {
  readonly type = QuestionActions.FETCH_QUESTIONS_FAILED;
}
