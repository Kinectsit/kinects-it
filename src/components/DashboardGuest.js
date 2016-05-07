import React, { PropTypes } from 'react';

export const DashboardGuest = () => (
  <div>
    <h1>DashboardGuest</h1>
  </div>
);

DashboardGuest.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};
