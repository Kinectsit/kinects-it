/* eslint-disable */

import {
  SET_USER,
  ADD_DEVICE,
  ADD_RENTAL,
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function appState(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const newState = objectAssign({}, state);
      // add function to modify the new state here
      return newState;
    }
    case ADD_DEVICE: {
      return {
        device: action.device,
      };
    }
    case ADD_RENTAL: {
      const newState = objectAssign({}, state);
      // add function to modify the new state here
      return newState;
    }
    default:
      return state;
  }
}

