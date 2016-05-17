import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import Toggle from 'material-ui/Toggle';
import styles from '../assets/formStyles';
import $ from 'jquery';

export class DeviceProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  toggleDevice() {
    const id = this.props.appState.featured.id;
    const deviceState = {
      isactive: !this.props.appState.featured.isactive,
      paidusage: false,
    };

    const homeId = this.props.appState.house.id;
    const apiPath = '/api/v1/homes/'.concat(homeId).concat('/devices/').concat(id);

    $.post(apiPath, deviceState, (req) => {
      if (!req.success === true) {
        this.setState({
          error: req.message,
        });
      } else {
        if (this.props.appState.featured.isactive) {
          this.props.actions.toggleDevice(false);
        } else {
          this.props.actions.toggleDevice(true);
        }
      }
    })
    .fail(() => {
      // set local state to display error
      this.setState({
        error: 'Failed to connect to device, try again.',
      });
    });
  }

  render() {
    let errorMsg = <div style={styles.error}>{this.state.details}</div>;
    let toggle = (
      <Toggle
        onToggle={() => this.toggleDevice()}
        defaultToggled={this.props.appState.featured.isactive}
      />
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

    return (
      <div>
        <h2>{this.props.appState.featured.name}</h2>
        {errorMsg}
        <h3>{this.props.appState.featured.description}</h3>
        {toggle}
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

