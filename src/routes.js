signimport React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './components/App';
import { Home } from './components/Home';
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={LoginView} />
    <Route path="/signup" component={SignupView} />
  </Route>
);
