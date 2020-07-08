import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as a from './../../actions/index.js';

describe('ticketListReducer', () => {
  let action;
  let action2;
  const ticketData = {
    names: "Ryan & Josh",
    location: "4b",
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

  test("should add new ticket data to masterTicketList", () => {
    const { names, location, issue, id } = ticketData;
    action = a.addTicket({
      names: names,
      location: location,
      issue: issue,
      id: id
    })
    expect(ticketListReducer({}, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    })
  })

  test("should update ticket data with new ticket", () => {
    const { names, location, issue, id } = ticketData;
    const { names2, location2, issue2, id2 } = ticketData2;
    action = a.addTicket({
      names: names,
      location: location,
      issue: issue,
      id: id
    })
    action2 = a.addTicket({
      names: names2,
      location: location2,
      issue: issue2,
      id: id2
    })
    let original = ticketListReducer({}, action)[0];
    expect(ticketListReducer(original, action2)).toEqual({
      [id2]: {
        names: names2,
        location: location2,
        issue: issue2,
        id: id2
      }
    })
  })

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
});