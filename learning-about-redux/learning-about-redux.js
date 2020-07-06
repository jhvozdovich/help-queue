//VSCODE R CLICK AND OPEN IN LIVE SERVER, INSPECT 
const ticketListReducer = (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
    case "ADD_TICKET":
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    case "DELETE_TICKET":
      const newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};

const { createStore } = Redux;
const store = createStore(ticketListReducer);
console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch({
  type: 'ADD_TICKET',
  names: 'Nick and Jessica',
  location: '2a',
  issue: 'Not enough ice cream.',
  id: 1
});

store.dispatch({
  type: 'ADD_TICKET',
  names: 'Josh and Chelsea',
  location: '3b',
  issue: 'League wedding.',
  id: 2
});

unsubscribe();