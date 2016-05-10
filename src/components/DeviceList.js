import React, { PropTypes } from 'react';
import { DeviceRow } from '../containers/DeviceRow';

export const DeviceList = (props) => (
  <div>
    <h1>Device List </h1>
    <ul>
      {props.appState.devices.map(device =>
        <DeviceRow device={device} actions={props.actions} />
      )}
    </ul>
  </div>
);

DeviceList.propTypes = {
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isrequired,
};

