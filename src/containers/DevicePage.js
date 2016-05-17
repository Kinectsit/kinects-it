import React, { PropTypes } from 'react';
import { DeviceChart } from '../components/DeviceChart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
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
      deviceActive: false,
      canSubmit: false,
      error: '',
      totalCost: 0,
      time: 0,
      units: 0,
      deviceTransactions: [],
    };
  }

  componentDidMount() {
    const homeId = this.props.appState.house.id;
    const deviceId = this.props.appState.featured.id;
    const user = { user: this.props.authState.user.id };

    const apiPath = '/api/v1/homes/'.concat(homeId).concat('/devices/').concat(deviceId);
    $.get(apiPath, user, (req) => {
      this.setState({
        deviceTransactions: req,
      });
    })
    .fail((error) => {
      console.log('error in server response', error);
    });
  }

  totalCost(time, units) {
    const costPerMs = this.props.appState.featured.usagecostoptions / 3600000;
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
    const hardwarekey = this.props.appState.featured.hardwarekey;
     // TODO: need to replace the home ID with the real one once it is in appState
    const apiPath = '/api/v1/homes/1/devices/'.concat(hardwarekey);

    $.post(apiPath, deviceState, (res) => {
      if (!res.success) {
        this.setState({
          error: res.message,
        });
      } else {
        this.props.actions.toggleDevice(true);
        this.props.actions.paidUsage(true);
        this.setState({
          deviceActive: true,
        });
      }
    })
    .fail(() => {
      // set local state to display error
      this.setState({
        error: 'Failed to connect to device, try again.',
      });
    });
  }

  submitForm(data) {
    const totalTime = data.time * data.units;
    const deviceState = this.props.appState.featured;
    deviceState.payaccountid = this.props.appState.payAccounts[0].id; // first payment option
    deviceState.timespent = totalTime;
    deviceState.amountspent = this.totalCost(data.time, data.units);
    deviceState.paidusage = true;
    deviceState.isactive = true;
    deviceState.deviceid = this.props.appState.featured.id;

    this.toggleDevice(deviceState);
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    let errorMsg = <div style={styles.error}>{this.state.error}</div>;

    if (this.props.appState.featured.id === '') {
      return (
        <div style={styles.center}>
          <h2>Uh oh!</h2>
          <p>You need to choose a device to display.</p>
          <p>Click <a href="/dashboard">here</a> to return to your dashboard.</p>
        </div>
      );
    }

    let formDisplay = (
      <Paper style={styles.paperStyle}>
        <Formsy.Form
          onValid={() => this.enableButton()}
          onInvalid={() => this.disableButton()}
          onValidSubmit={(data) => this.submitForm(data)}
          onInvalidSubmit={() => this.notifyFormError()}
        >
          <FormsyRadioGroup name="time" defaultSelected="1" onChange={(e) => this.handleTime(e)}>
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
    );

    if (this.state.deviceActive === true) {
      formDisplay = <div>Device is active!</div>;
    }

    return (
      <div>
        <h2>How much time would you like to use the {this.props.appState.featured.name}?</h2>
        {errorMsg}
        <h3>This device is: {this.props.appState.featured.description}</h3>
        {formDisplay}
        {JSON.stringify(this.state.deviceTransactions)}
        <DeviceChart />
      </div>
    );
  }
}


DevicePage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    appState: state.appState,
    authState: state.authState,
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

    // if (this.state.deviceActive === true) {
    //   formDisplay = <div>Device is active!</div>;
    // }

    // let chart = <div></div>;
    // if (this.state.deviceTransactions.length > 4) {
    //   chart = <div><DeviceChart data={this.state.deviceTransactions} /></div>;
    // }

