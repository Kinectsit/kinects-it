/* eslint-disable */

import {
  LOAD_DEVICES,
  LOAD_PAY_ACCOUNTS,
  SET_USER,
  ADD_DEVICE,
  SET_FEATURED,
  TOGGLE_DEVICE,
  PAID_USAGE,
  SETUP_DEVICE_OPTIONS,
  ADD_RENTAL,
  SET_USER_AS_HOST,
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';
import CONSTANTS from '../constants/actionTypes';


// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function appState(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEVICES: {
      const newState = objectAssign({}, state);
      newState.devices = action.devices;
      return newState;
    }
    case LOAD_PAY_ACCOUNTS: {
      const newState = objectAssign({}, state);
      newState.payAccounts = action.payAccounts;
      return newState;
    }
    case ADD_DEVICE: {
      const newState = objectAssign({}, state);
      newState.configuredDevice = action.configuredDevice;
      return newState;
    }
    case SET_FEATURED: {
      const newState = objectAssign({}, state);
      newState.featured = action.device;
      return newState;
    }
    case TOGGLE_DEVICE: {
      const newState = objectAssign({}, state);
      newState.featured.isactive = action.isactive;
      return newState;
    }
    case PAID_USAGE: {
      const newState = objectAssign({}, state);
      newState.featured.paidusage = action.paidusage;
      return newState;
    }
    case SETUP_DEVICE_OPTIONS: {
      const newState = objectAssign({}, state);
      newState.device = action.device;
      return newState;
    }
    case ADD_RENTAL: {
      const newState = objectAssign({}, state);
      newState.house.id = action.rentalId;
      return newState;
    }
    case CONSTANTS.ADD_HOUSE: {
      const newState = objectAssign({}, state);
      newState.house.id = action.house.id;
      newState.house.code = action.house.code;
      return newState;
    }
    case SET_USER_AS_HOST: {
      const newState = objectAssign({}, state);
      newState.isHost = action.isHost;
      return newState;
    }
    default:
      return state;
  }
}

