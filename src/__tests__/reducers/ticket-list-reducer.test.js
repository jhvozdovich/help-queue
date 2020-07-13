import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as a from './../../actions/index.js';
import * as c from './../../actions/ActionTypes.js';
import Moment from 'moment';

describe('ticketListReducer', () => {
  let action;
  let action2;
  const ticketData = {
    names: "Ryan & Josh",
    location: "4b",
    timeOpen: 0,
    issue: "Fite roomba",
    id: 1
  };
  const ticketData2 = {
    names: "Ryan & Josh & Chelsea",
    location: "4b",
    issue: "Fite roomba",
    id: 1
  };
  const currentState = {
    1: {
      names: "Ryan & Josh",
      location: "4b",
      issue: "Fite roomba",
      id: 1
    },
    2: {
      names: "Nick & Jessica",
      location: "11c",
      issue: "car battery",
      id: 2
    }
  }
  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });

  test("should delete a ticket", () => {
    action = a.deleteTicket(1)
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: "Nick & Jessica",
        location: "11c",
        issue: "car battery",
        id: 2
      }
    })
  })

  test('Should add a formatted wait time to ticket entry', () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: '4 minutes',
      id: id
    };
    expect(ticketListReducer({ [id]: ticketData }, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes'
      }
    });
  });
});