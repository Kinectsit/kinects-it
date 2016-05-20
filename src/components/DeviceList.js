import React, { PropTypes } from 'react';
import { DeviceRow } from '../containers/DeviceRow';
import Divider from 'material-ui/Divider';
import kinectsitTheme from '../assets/kinectsitTheme';

export const DeviceList = (props) => (
  <div className="device-list-container">
    <h3>Available Devices</h3>
    <div className="row">
      <div className="medium-8 columns medium-centered">
        <Divider
          style={{ backgroundColor: kinectsitTheme.palette.primary2Color }}
        />
      </div>
    </div>
    <div className="device-list">
      {props.appState.devices.map((device, index) =>
        <div key={index}>
          <DeviceRow device={device} appState={props.appState} actions={props.actions} />
        </div>
      )}
    </div>
  </div>
);

DeviceList.propTypes = {
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

