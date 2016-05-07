import { INCREMENT, DECREMENT } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

export const appState = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT: {
      const newState = objectAssign({}, state);
      newState.count += 1;
      return newState;
    }
    case DECREMENT: {
      const newState = objectAssign({}, state);
      newState.count -= 1;
      return newState;
    }
    default:
      return state;
  }
};

