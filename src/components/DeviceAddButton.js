import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export const DeviceAddButton = () => (
  <div>
    <RaisedButton label="Add Device" />
  </div>
);

DeviceAddButton.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

// route to /setupDevicePage on button click (after successful API)

