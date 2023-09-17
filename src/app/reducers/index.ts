import { _getIsBootstraped, _getIsLoading, _getIsLoggedIn, _getIsTestSubmitted, _getLoggedInUser, appReducer, AppState } from './app';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { _getQuestions, _getIsQuestionsLoaded, _getIsQuestionsLoading, questionsReducer, QuestionState } from './question';
import { _getIsAnswersInitialized, answersAdapter, answersReducer, AnswersState } from './answers';

export interface RootState {
  app: AppState;
  questions: QuestionState;
  answers: AnswersState;
}

export const appRootReducer = {
  app: appReducer,
  questions: questionsReducer,
  answers: answersReducer
};


export const getAppState = (state: RootState) => state.app;
export const getQuestionState = (state: RootState) => state.questions;
export const getAnswersState = (state: RootState) => state.answers;

// @desc: Auth selectors

export const getLoggedInUser = createSelector(
  getAppState,
  _getLoggedInUser
);

export const getIsLoading = createSelector(
  getAppState,
  _getIsLoading
);

export const getIsLoggedIn = createSelector(
  getAppState,
  _getIsLoggedIn
);

// @desc: Questions selector

export const getQuestions = createSelector(
  getQuestionState,
  _getQuestions
);

export const getIsQuestionsLoaded = createSelector(
  getQuestionState,
  _getIsQuestionsLoaded
);

export const getIsQuestionsLoading = createSelector(
  getQuestionState,
  _getIsQuestionsLoading
);

export const getIsBootstraped = createSelector(
  getAppState,
  _getIsBootstraped
);

// @desc: Answers selector: Entity Adapter selectors

export const {
  selectIds: getQuestionIds,
  selectEntities: getAnswerEntities,
  selectAll: getAllAnswers,
  selectTotal: getTotalAnswers
} = answersAdapter.getSelectors(getAnswersState);

export const getAnswers = (state) => getAllAnswers(state);

export const getIsAnswersInitialized = createSelector(
  getAnswersState,
  _getIsAnswersInitialized
);

export const getIsTestSubmitted = createSelector(
  getAppState,
  _getIsTestSubmitted
);
