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
    const hardwarekey = this.props.appState.featured.hardwarekey;
    const deviceState = {
      isActive: !this.props.appState.featured.isActive,
      paidUsage: false,
    };
    const context = this;
     // TODO: need to replace the home ID with the real one once it is in appState
    const apiPath = 'http://localhost:3001/api/v1/homes/1/devices/'.concat(hardwarekey);

    $.post(apiPath, deviceState, (req) => {
      if (!req.success === true) {
        console.log('there was an error???');
        context.setState({
          error: req.message,
        });
      } else {
        if (this.props.appState.featured.isActive) {
          this.props.actions.toggleDevice(false);
        } else {
          this.props.actions.toggleDevice(true);
        }
      }
    })
    .fail(() => {
      // set local state to display error
      context.setState({
        error: 'Failed to connect to device, try again.',
      });
    });
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
        <h2>{this.props.appState.featured.name}</h2>
        {errorMsg}
        <h3>{this.props.appState.featured.description}</h3>
        <Toggle
          onToggle={() => this.toggleDevice()}
          defaultToggled={this.props.appState.featured.isActive}
        />
      </div>
    );
  }
}


DeviceProfilePage.propTypes = {
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
)(DeviceProfilePage);

