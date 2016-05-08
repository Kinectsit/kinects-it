import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(logger));
}

