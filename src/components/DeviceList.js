import React, { PropTypes } from 'react';

export const DeviceList = () => (
  <div>
    <h1>Device List </h1>
  </div>
);

DeviceList.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

// map deviceRows to this!

