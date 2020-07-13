import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as a from './../../actions/index.js';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      masterTicketList: {},
      formVisibleOnPage: false
    });
  });

  test('initialticketListReducer matches root reducer', () => {
    expect(store.getState().masterTicketList).toEqual(ticketListReducer(undefined, { type: null }));
  });

  test('initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  test('pass action and initial state of formVisibleReducer matches root reducer', () => {
    const action = a.toggleForm()
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });

});