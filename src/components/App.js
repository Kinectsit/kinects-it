import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
// import { IndexLink } from 'react-router';

import { NavLink } from './NavLink';

export const App = (props) => (
  <div>
    <ul role="navigation">
      <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/signup">Signup</NavLink></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};
