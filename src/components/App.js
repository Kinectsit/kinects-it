import React, { PropTypes } from 'react';

import { NavLink } from './NavLink';

/**
* This is an import the global styles sheet.
* Webpack combines this and ouputs as a unique stylesheet when run
*/
import '../assets/scss/app.scss';

export const App = (props) => (
  <div>
    <ul role="navigation">
      <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
      <li><a href="/#how-it-works">How it Works</a></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/signup">Signup</NavLink></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.element,
  route: PropTypes.object,
};
