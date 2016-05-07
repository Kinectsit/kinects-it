import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export const LeaveHomeButton = () => (
  <div>
    <RaisedButton label="Leave Home" />
  </div>
);

LeaveHomeButton.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

// route to /joinRental on button click

