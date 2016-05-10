import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink } from './NavLink';

export const LeaveHomeButton = () => (
  <div>
    <NavLink to="/joinRental">
      <RaisedButton label="Leave Home" />
    </NavLink>
  </div>
);

LeaveHomeButton.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

