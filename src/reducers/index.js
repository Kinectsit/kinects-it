import { combineReducers } from 'redux';
import appState from './appState';
import authState from './authState';

const rootReducer = combineReducers({
  appState, authState,
});

export default rootReducer;

