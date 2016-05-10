import React, { PropTypes } from 'react';

export const DashboardGuest = () => (
  <div>
    <h1>DashboardGuest</h1>
  </div>
);

DashboardGuest.propTypes = {
  appState: PropTypes.object.isRequired,
};
