import CONSTANTS from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialAuthState from './initialAuthState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authState(state = initialAuthState, action) {
  switch (action.type) {
    case CONSTANTS.SET_AUTHENTICATION: {
      const newState = objectAssign({}, state);
      newState.isAuthenticated = action.isAuthenticated;
      newState.sessionId = action.sessionId;
      return newState;
    }
    case CONSTANTS.SET_USER: {
      const newState = objectAssign({}, state);
      newState.user.name = action.user.name;
      newState.user.email = action.user.email;
      newState.user.id = action.user.id;
      return newState;
    }
    default:
      return state;
  }
}
