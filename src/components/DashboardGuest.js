import React, { PropTypes } from 'react';
import { DeviceList } from './DeviceList';
import { LeaveHomeButton } from '../containers/LeaveHomeButton';

export const DashboardGuest = (props) => (
  <div>
    <h1>Dashboard Guest</h1>
    <LeaveHomeButton
      appState={props.appState}
      authState={props.authState}
      actions={props.actions}
    />
    <DeviceList appState={props.appState} actions={props.actions} />
  </div>
);

DashboardGuest.propTypes = {
  appState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

