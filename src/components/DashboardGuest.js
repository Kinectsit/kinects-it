import React, { PropTypes } from 'react';
import { DeviceList } from './DeviceList';

export const DashboardGuest = (props) => (
  <div>
    <h1>DashboardGuest</h1>
    <DeviceList appState={props.appState} />
  </div>
);

DashboardGuest.propTypes = {
  appState: PropTypes.object.isRequired,
};

