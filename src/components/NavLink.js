import React from 'react';
import { Link } from 'react-router';

export const NavLink = (props) => (
  <Link {...props} activeClassName="active" />
);
