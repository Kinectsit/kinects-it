import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import Toggle from 'material-ui/Toggle';
import styles from '../assets/formStyles';
import { DeleteDeviceButton } from './DeleteDeviceButton';
import { DeviceChart } from '../components/DeviceChart';
import CircularProgress from 'material-ui/CircularProgress';
import { FormMessageDialogue } from '../components/FormMessageDialogue';
import $ from 'jquery';

export class DeviceProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      deviceTransactions: [],
      spinner: false,
    };
  }

  componentDidMount() {
    const homeId = this.props.appState.house.id;
    const deviceId = this.props.appState.featured.id;

    const apiPath = '/api/v1/homes/'.concat(homeId).concat('/devices/').concat(deviceId);
    $.get(apiPath, (res) => {
      if (res.success === false) {
        this.setState({
          error: 'Communication error',
          details: 'Failed to retrieve devices from home, please try again.',
        });
        this.openErrorMessage();
      } else {
        this.setState({
          deviceTransactions: res,
        });
      }
    })
    .fail((/* error */) => {
      this.setState({
        error: 'Communication error',
        details: 'Failed to retrieve devices from home, please try again.',
      });
      this.openErrorMessage();
    });
  }

  openErrorMessage() {
    this.messageDialogue.handleOpen();
  }

  toggleDevice() {
    this.state.error = '';
    this.state.details = '';

    const id = this.props.appState.featured.id;
    const deviceState = {
      isactive: !this.props.appState.featured.isactive,
      paidusage: false,
    };

    const homeId = this.props.appState.house.id;
    const apiPath = '/api/v1/homes/'.concat(homeId).concat('/devices/').concat(id);

    this.setState({ spinner: true });

    $.post(apiPath, deviceState, (res) => {
      if (!res.success) {
        this.setState({
          error: 'Device communication error',
          details: res.message,
        });
        this.openErrorMessage();
      } else {
        if (this.props.appState.featured.isactive) {
          this.props.actions.toggleDevice(false);
        } else {
          this.props.actions.toggleDevice(true);
        }
      }
    })
    .fail(() => {
      this.setState({
        error: 'Device communication error',
        details: 'Failed to connect to device, please try again.',
      });
      this.openErrorMessage();
    })
    .always(() => {
      this.setState({ spinner: false });
    });
  }

  render() {
    let spinner = this.state.spinner ?
      <div className="loading"><CircularProgress size={2} /></div> : '';
    let toggle = (
      <div style={{ height: '150px', paddingTop: '20px' }}>
        <Toggle
          iconStyle={{ width: '120px' }}
          trackStyle={{ height: '75px', width: '220px', borderRadius: '220px' }}
          thumbStyle={{ width: '130px', height: '130px', top: '-20px' }}
          onToggle={() => this.toggleDevice()}
          defaultToggled={this.props.appState.featured.isactive}
        />
      </div>
    );

    if (this.props.appState.featured.id === '') {
      return (
        <div style={styles.center}>
          <h2>Uh oh!</h2>
          <p>You need to choose a device to display.</p>
          <p>Click <a href="/dashboard">here</a> to return to your dashboard.</p>
        </div>
      );
    }
    if (this.props.appState.featured.paidusage === true) {
      toggle = (
        <div>
          <p>Your guest has paid to use the device</p>
          <Toggle
            disabled={'true'}
            onToggle={() => this.toggleDevice()}
            defaultToggled={this.props.appState.featured.isactive}
          />
        </div>
      );
    }

    let chart = <div></div>;

    if (this.state.deviceTransactions.length > 0) {
      chart = <div><DeviceChart transactions={this.state.deviceTransactions} /></div>;
    }

    return (
      <div>
        <h1 style={{ textTransform: 'capitalize' }}>{this.props.appState.featured.name}</h1>
        {spinner}
        <h3>{this.props.appState.featured.description}</h3>
        <h2>Toggle Device</h2>
        <p>Use this to test the device or enable without payment</p>
        {toggle}
        <DeleteDeviceButton device={this.props.appState.featured} />
        <h2>Recent Guest Transactions</h2>
        {chart}
        <FormMessageDialogue
          ref={(node) => { this.messageDialogue = node; }}
          title={this.state.error}
          failure
        >
          <p>{this.state.details}</p>
        </FormMessageDialogue>
      </div>
    );
  }
}

DeviceProfilePage.propTypes = {
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
)(DeviceProfilePage);

