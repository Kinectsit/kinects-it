/* eslint-disable */

import {
  SET_USER,
  ADD_DEVICE,
  SET_FEATURED,
  SETUP_DEVICE,
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
    case SETUP_DEVICE: {
      const newState = objectAssign({}, state);
      newState.device = action.device;
      return newState;
    }
    case ADD_DEVICE: {
      const newState = objectAssign({}, state);
      console.log('action: ', action.enabledDevice);
      newState.enabledDevice = action.enabledDevice;
      return newState;
    }
    case SET_FEATURED: {
      const newState = objectAssign({}, state);
      newState.featured = action.device;
      return newState;
    }
    case ADD_RENTAL: {
      const newState = objectAssign({}, state);
      newState.houseName = action.rental;
      return newState;
    }
    default:
      return state;
  }
}

