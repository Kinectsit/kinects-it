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
  toggleDevice(device) {
    const context = this;
     // TODO: need to replace the home ID with the real one once it is in appState
    const apiPath = 'http://localhost:3001/api/v1/homes/1/devices/'.concat(device.deviceId);

    $.post(apiPath, (req) => {
      const configuredDevice = {
        configured: true,
        id: device.deviceId,
      };

      if (!req.success === true) {
        context.setState({
          error: 'ADD_DEVICE',
        });
      } else {
        this.props.actions.addDevice(configuredDevice);
        // send user to setupDevice page if successful response
        browserHistory.push('/setupDevice');
      }
    })
    .fail((error) => {
      // set local state to display error
      context.setState({
        error: 'ADD_DEVICE',
        details: error,
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
      errorMsg = <div style={styles.error}>Failed to connect to device, please try again.</div>;
    }

    return (
      <div>
        <div style={styles.center}>
          <h2>Add Device</h2>
          {errorMsg}
          <div>
            Enter a device ID to begin setting up a new device.
          </div>
        </div>

        <Paper style={styles.paperStyle}>
          <Formsy.Form
            onValid={() => this.enableButton()}
            onInvalid={() => this.disableButton()}
            onValidSubmit={(data) => this.toggleDevice(data)}
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
