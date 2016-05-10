import React, { PropTypes } from 'react';
import { DeviceList } from './DeviceList';
import { LeaveHomeButton } from './LeaveHomeButton';

export const DashboardGuest = (props) => (
  <div>
    <h1>Dashboard Guest</h1>
    <LeaveHomeButton />
    <DeviceList appState={props.appState} actions={props.actions} />
  </div>
);

DashboardGuest.propTypes = {
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

