import React, { PropTypes } from 'react';
import { NavLink } from './NavLink';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export const NavMenu = (props) => (
  <Menu onTouchTap={props.onClick} >
    <NavLink to="/" onlyActiveOnIndex>
      <MenuItem>Home</MenuItem>
    </NavLink>
    <a href="/#how-it-works">
      <MenuItem>How it Works</MenuItem>
    </a>
    <NavLink to="/login">
      <MenuItem>Login</MenuItem>
    </NavLink>
    <NavLink to="/signup">
      <MenuItem>Signup</MenuItem>
    </NavLink>
  </Menu>
);

NavMenu.propTypes = {
  onClick: PropTypes.function,
};
