import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import $ from 'jquery';

export class DeleteDeviceButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  removeDevice() {
    const deviceId = this.props.device.id;
    /* homes id does not matter in this API call, not used */
    const urlPath = '/api/v1/homes/1/devices/'.concat(deviceId);

    $.ajax({
      url: urlPath,
      dataType: 'json',
      crossDomain: true,
      method: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      success: (result) => {
        console.log('result is ', result);
        // send user to dashboard and new list of devices will populate
        browserHistory.push('/dashboard');
      },
      error: (/* xhr, status, err */) => {
        this.setState({ error: 'Error leaving device - please try again in a few minutes.' });
      },
    });
  }

  render() {
    return (
      <div>
        <div><RaisedButton label="Remove Device" onClick={() => (this.removeDevice())} /></div>
        <div>Warning: This action can not be undone.</div>
        <div>{this.state.error}</div>
      </div>
    );
  }
}

DeleteDeviceButton.propTypes = {
  device: PropTypes.object.isRequired,
};

