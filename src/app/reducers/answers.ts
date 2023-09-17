import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Answer } from '../models/answer';
import { Action } from '../actions';
import { AnswersAction } from '../actions/answers';

export interface AnswersState extends EntityState<Answer> {
  isInitialized: boolean;
}

export const answers = (a: Answer) => a.question;

export const answersAdapter = createEntityAdapter({
  selectId: answers,
  sortComparer: null
});

export const initialState = answersAdapter.getInitialState({
  isInitialized: false
});


export function answersReducer(state: AnswersState = initialState, action: Action) {
  switch (action.type) {
    case AnswersAction.INITIALIZE_ANSWERS:
      return {
        ...answersAdapter.addMany(action.payload, state),
        isInitialized: true
      };
    case
    AnswersAction.UPDATE_ANSWER:
      return answersAdapter.updateOne({
        id: action.payload.question,
        changes: {
          answer: action.payload.answer
        }
      }, state);
    default :
      return state;
  }
}

export const _getIsAnswersInitialized = (state: AnswersState) => state.isInitialized;
