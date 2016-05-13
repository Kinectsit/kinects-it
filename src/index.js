import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();
// example if you want to set up with react-router-redux:
// https://github.com/acdlite/redux-router
// const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('app')
);
