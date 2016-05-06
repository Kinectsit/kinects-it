import React, { PropTypes } from 'react';

import { NavLink } from './NavLink';


export const TitleBar = () => (
  <div>

    <div className="title-bar hide-for-medium" data-responsive-toggle="widemenu" data-hide-for="medium">
      <div className="title-bar-right">
        <span className="title-bar-title position-left">Kinects</span>
        <button className="menu-icon" type="button" data-open="offCanvasRight"></button>
      </div>
    </div>

    <div className="off-canvas position-right" id="offCanvasRight" data-off-canvas data-position="right">
      <ul className="vertical dropdown menu" data-dropdown-menu role="navigation">
        <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
        <li><a href="/#how-it-works">How it Works</a></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
      </ul>
    </div>

    <nav id="widemenu" className="top-bar show-for-medium">
      <div className="top-bar-title">Kinects.It</div>
      <div className="top-bar-right">
        <ul className="menu" role="navigation">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><a href="/#how-it-works">How it Works</a></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/signup">Signup</NavLink></li>
        </ul>
      </div>
    </nav>
  </div>
);