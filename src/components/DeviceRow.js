import React, { PropTypes } from 'react';

export const DeviceRow = () => (
  <div>
    <h1>Individual Device Row </h1>
  </div>
);

DeviceRow.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

