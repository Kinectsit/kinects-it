import React, { PropTypes } from 'react';

export const DashboardHost = () => (
  <div>
    <h1>DashboardHost</h1>
  </div>
);

DashboardHost.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};
