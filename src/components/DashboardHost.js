import React, { PropTypes } from 'react';
import { DeviceAddButton } from './DeviceAddButton';
import { DeviceList } from './DeviceList';

export const DashboardHost = (props) => (
  <div>
    <h1>Dashboard Host</h1>
    <p>Host Code: {props.appState.house.code}</p>
    <DeviceAddButton />
    <DeviceList appState={props.appState} actions={props.actions} />
  </div>
);

DashboardHost.propTypes = {
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

