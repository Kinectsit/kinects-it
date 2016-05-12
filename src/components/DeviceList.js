import React, { PropTypes } from 'react';
import { DeviceRow } from '../containers/DeviceRow';

export const DeviceList = (props) => (
  <div>
    <h1>Device List </h1>
    <ul>
      {props.appState.devices.map((device, index) =>
        <div key={index}>
          <DeviceRow device={device} appState={props.appState} actions={props.actions} />
        </div>
      )}
    </ul>
  </div>
);

DeviceList.propTypes = {
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

