import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
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
      totalCost: 0,
      time: 0,
      units: 0,
    };
  }

  totalCost(time, units) {
    const costPerMs = this.props.appState.featured.cost / 86400000;
    return (units * time * costPerMs).toFixed(2);
  }


  handleTime(e) {
    const time = parseInt(e.target.value, 10);
    const totalCost = this.totalCost(time, this.state.units);

    this.setState({
      time,
      totalCost,
    });
  }

  handleUnits(e) {
    const units = parseInt(e.target.value, 10);
    const totalCost = this.totalCost(this.state.time, units);

    this.setState({
      units,
      totalCost,
    });
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
    const hardwarekey = this.props.appState.featured.hardwarekey;
     // TODO: need to replace the home ID with the real one once it is in appState
    const apiPath = '/api/v1/homes/1/devices/'.concat(hardwarekey);

    $.post(apiPath, deviceState, (req) => {
      if (!req.success === true) {
        context.setState({
          error: req.message,
        });
      } else {
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
    const deviceState = this.props.appState.featured;
    deviceState.time = totalTime;
    deviceState.paidusage = true;
    deviceState.isactive = true;

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
        <Paper style={styles.paperStyle}>
          <Formsy.Form
            onValid={() => this.enableButton()}
            onInvalid={() => this.disableButton()}
            onValidSubmit={(data) => this.submitForm(data)}
            onInvalidSubmit={() => this.notifyFormError()}
          >
            <FormsyRadioGroup name="time" defaultSelected="1" onChange={(e) => this.handleTime(e)}>
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
              onChange={(e) => this.handleUnits(e)}
              floatingLabelText="How many units do you want?"
            />
            <FlatButton
              style={styles.submitStyle}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
          <Subheader>
            <p>Total cost: {this.state.totalCost}</p>
          </Subheader>
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

