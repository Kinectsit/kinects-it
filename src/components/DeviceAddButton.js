import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink } from './NavLink';

export const DeviceAddButton = () => (
  <div>
    <NavLink to="/add-device">
      <RaisedButton label="Add Device" />
    </NavLink>
  </div>
);

