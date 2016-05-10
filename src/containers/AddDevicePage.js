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
      deviceIdError: 'Please provide a valid email',
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

  onTextChange() {
    console.log('HELLO!!!');
  }

  captureFormChange(event) {
    console.log("FORM CHANGE!!: ", event.target.value);
    // this.setState({
    //   device: event.target.value,
    // });
  }

  addDevice(device) {
    const apiPath = 'http://localhost:3001/api/v1/homes/1/devices/'.concat(device);

    $.post(apiPath, (data) => {
      console.log('Successful call to add a device:, ', data);
    })
    .done((data) => {
      console.log('May not be needed', data);
    })
    .fail((error) => {
      console.log('Error posting device add: ', error);
    })
    .always(() => {
      console.log('Finished device add');
    });

    this.props.actions.addDevice(device);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  submitForm(data) {
    console.log('data = ', data);

    $.post('http://localhost:3001/api/v1/devices/signup', () => {
      console.log('success');
    })
    .done(() => {
      console.log('second success');
    })
    .fail(() => {
      console.log('error');
    })
    .always(() => {
      console.log('finished');
    });
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
              onChange={this.onTextChange}
              onBlur={this.onTextChange}
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

// onChange={(event) => this.captureFormChange(event)}

