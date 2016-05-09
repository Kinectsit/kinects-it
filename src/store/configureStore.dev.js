// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(logger)
  );


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer.default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

