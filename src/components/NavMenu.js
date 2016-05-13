import React, { PropTypes } from 'react';
import { NavLink } from './NavLink';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export const NavMenu = (props) => (
  <Menu onTouchTap={props.onClick} >
  {!props.isLoggedIn ?
    <div className="menu-container">
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
    </div> :
    <div className="menu-container">
      <NavLink to="/dashbaord">
        <MenuItem>My Dashboard</MenuItem>
      </NavLink>
      <NavLink to="/add-device">
        <MenuItem>Add A Device</MenuItem>
      </NavLink>
      <a href="/logout">
        <MenuItem>Logout</MenuItem>
      </a>
    </div>
  }
  </Menu>
);

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
