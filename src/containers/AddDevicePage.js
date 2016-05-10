import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import styles from '../assets/formStyles';
import $ from 'jquery';

export class AddDevicePage extends React.Component {

  constructor(props) {
    super(props);

    this.errorMessages = {
      deviceIdError: 'Please provide a valid device ID',
    };

    this.state = {
      device: '',
      canSubmit: false,
    };

    this.disableButton();
  }

  componentDidMount() {
    console.log('Add device is being mounted');

    /*
    this.serverRequest = $.get('http://localhost:3000/api/v1/homes/1/devices', (devices) => {
      console.log('devices = ', devices);

      // this.setState({
      //   username: lastGist.owner.login,
      //   lastGistUrl: lastGist.html_url,
      // });
    })
    .done(() => {
      console.log('INSIDE DONE OF devices');
    })
    .fail(() => {
      console.log('ERROR in devices.');
    });
    */
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
    Called on submit of the form to dispatch action
  */
  addDevice(device) {
     // POST request to see if can connect to device
    const apiPath = 'http://localhost:3001/api/v1/homes/1/devices/'.concat(device);

    $.post(apiPath, (data) => {
      console.log('Successful call to add a device: ', data);
    })
    .done((data) => {
      console.log('May not be needed: ', data);
    })
    .fail((error) => {
      console.log('Error posting device add: ', error);
    })
    .always(() => {
      console.log('Finished device add');
    });

    // if error, create local state to show it
    // if success, update state
    console.log('add device: ', device);
    this.props.actions.addDevice(device);
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
    return (
      <div>
        <div style={styles.center}>
          <h2>Add Device</h2>
        </div>

        <div>
          Enter a device ID to begin setting up a new device.
        </div>

        <Paper style={styles.paperStyle}>
          <Formsy.Form
            onValid={() => this.enableButton()}
            onInvalid={() => this.disableButton()}
            onValidSubmit={(data) => this.addDevice(data)}
            onInvalidSubmit={() => this.notifyFormError()}
            onSuccess={(data) => console.log('request received by the server!', data)}
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
