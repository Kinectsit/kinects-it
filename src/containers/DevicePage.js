import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import styles from '../assets/formStyles';
import Formsy from 'formsy-react';
import { FormsyText, FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui/lib';
import $ from 'jquery';

export class DevicePage extends React.Component {

  constructor(props) {
    super(props);
    this.errorMessages = {
      nameError: 'Please provide a valid name',
      descriptionError: 'Please enter a valid description',
      priceError: 'Please enter time and price options',
    };
    this.state = {
      canSubmit: false,
      error: '',
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  toggleDevice(deviceState) {
    const context = this;
    const deviceId = this.props.appState.featured.id;
     // TODO: need to replace the home ID with the real one once it is in appState
    const apiPath = 'http://localhost:3001/api/v1/homes/1/devices/'.concat(deviceId);

    $.post(apiPath, deviceState, (req) => {
      if (!req.success === true) {
        context.setState({
          error: req.message,
        });
      } else {
        console.log('success');
        this.props.actions.toggleDevice(true);
        this.props.actions.paidUsage(true);
      }
    })
    .fail(() => {
      // set local state to display error
      context.setState({
        error: 'Failed to connect to device, try again.',
      });
    });
  }

  submitForm(data) {
    const totalTime = data.time * data.units;
    console.log(totalTime);

    const deviceState = this.props.appState.featured;
    deviceState.time = totalTime;
    deviceState.paidUsage = true;
    deviceState.isActive = true;

    this.toggleDevice(deviceState);
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    let errorMsg = <div style={styles.error}>{this.state.details}</div>;
    if (this.props.appState.featured.id === '') {
      return (
        <div style={styles.center}>
          <h2>Uh oh!</h2>
          <p>You need to choose a device to display.</p>
          <p>Click <a href="/dashboard">here</a> to return to your dashboard.</p>
        </div>
      );
    }
    return (
      <div>
        <h2>How much time would you like to use the {this.props.appState.featured.name}?</h2>
        {errorMsg}
        <h3>This device is: {this.props.appState.featured.description}</h3>
        <Toggle
          onToggle={() => this.toggleDevice()}
          defaultToggled={this.props.appState.featured.isActive}
        />
        <Paper style={styles.paperStyle}>
          <Formsy.Form
            onValid={() => this.enableButton()}
            onInvalid={() => this.disableButton()}
            onValidSubmit={(data) => this.submitForm(data)}
            onInvalidSubmit={() => this.notifyFormError()}
            onSuccess={(data) => console.log('request received by the server!', data)}
          >
            <FormsyRadioGroup name="time" defaultSelected="1">
              <FormsyRadio
                value="20000"
                label="20 seconds"
              />
              <FormsyRadio
                value="60000"
                label="1 minute"
              />
              <FormsyRadio
                value="3600000"
                label="1 hour"
              />
              <FormsyRadio
                value="86400000"
                label="1 day"
              />
            </FormsyRadioGroup>
            <FormsyText
              name="units"
              validations="isExisty"
              validationError={this.errorMessages.descriptionError}
              required
              style={styles.fieldStyles}
              floatingLabelText="How many units do you want?"
            />
            <FlatButton
              style={styles.submitStyle}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </div>
    );
  }
}


DevicePage.propTypes = {
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
)(DevicePage);

