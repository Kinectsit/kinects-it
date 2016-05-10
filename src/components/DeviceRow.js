import React, { PropTypes } from 'react';

export const DeviceRow = (props) => {
  let active = '';
  if (props.device.isActive) {
    active = 'Active';
  } else {
    active = 'Not Active';
  }

  return (
    <div>
      <li>Name: {props.device.name}</li>
      <li>Is Active: {active}</li>
    </div>
  );
};

DeviceRow.propTypes = {
  device: PropTypes.object.isRequired,
};

