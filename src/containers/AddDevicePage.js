import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import styles from '../assets/formStyles';
import { browserHistory } from 'react-router';
import $ from 'jquery';
// import hardware from '../../config.js';

export class AddDevicePage extends React.Component {

  constructor(props) {
    super(props);

    this.errorMessages = {
      deviceIdError: 'Please provide a valid device ID',
    };

    this.state = {
      error: '',
      canSubmit: false,
    };
  }

  /**
    Called by onBlur and onChange of form to determine if submit button
    should be enabled or not
  */
  onTextChange(event) {
    if (event.target.value.length > 0) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  /**
    Called on after submit form to check hardware
  */
  pingDevice(device) {
    const context = this;
    const deviceState = { isActive: true };
     // TODO: need to replace the home ID with the real one once it is in appState
    const apiPath = 'http://localhost:3000/api/v1/homes/1/devices/ping/'.concat(device.deviceId);

    $.post(apiPath, deviceState, (req) => {
      const configuredDevice = {
        configured: true,
        id: device.deviceId,
        isActive: true,
      };

      if (!req.success === true) {
        context.setState({
          error: 'ADD_DEVICE',
          details: req.message,
        });
      } else {
        this.props.actions.addDevice(configuredDevice);
        // send user to setupDevice page if successful response
        browserHistory.push('/setup-device');
      }
    })
    .fail(() => {
      // set local state to display error
      context.setState({
        error: 'ADD_DEVICE',
        details: 'Failed to connect to device, try again.',
      });
    });
  }

  /**
    Called by onTextChange to enable submit button
  */
  enableButton() {
    this.setState({ canSubmit: true });
  }

  /**
    Called by onTextChange to disable submit button
  */
  disableButton() {
    this.setState({ canSubmit: false });
  }

  render() {
    let errorMsg = '';
    if (this.state.error === 'ADD_DEVICE') {
      errorMsg = <div style={styles.error}>{this.state.details}</div>;
    }

    return (
      <div>
        <div style={styles.center}>
          <h2>Add Device</h2>
          {errorMsg}
          <div>
            <p>Your device should be OFF before starting this process.</p>
            <p>Enter a device ID to begin setting up a new device.</p>
          </div>
        </div>

        <Paper style={styles.paperStyle}>
          <Formsy.Form
            onValid={() => this.enableButton()}
            onInvalid={() => this.disableButton()}
            onValidSubmit={(data) => { this.pingDevice(data); this.disableButton(); }}
            onInvalidSubmit={() => this.notifyFormError()}
            autoComplete="off"
          >
            <FormsyText
              name="deviceId"
              validations="isExisty"
              validationError={this.errorMessages.deviceIdError}
              required
              style={styles.fieldStyles}
              floatingLabelText="Enter Device ID"
              onChange={(event) => this.onTextChange(event)}
              onBlur={(event) => this.onTextChange(event)}
            />
            <div style={styles.center}>
              <FlatButton
                style={styles.submitStyle}
                type="submit"
                label="Find a Device"
                disabled={!this.state.canSubmit}
              />
            </div>
          </Formsy.Form>
        </Paper>
      </div>
    );
  }
}

AddDevicePage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDevicePage);
