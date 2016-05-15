import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { DashboardHost } from '../components/DashboardHost';
import { DashboardGuest } from '../components/DashboardGuest';
import $ from 'jquery';

export class DashboardPage extends React.Component {

  componentWillMount() {
    const context = this;
    const userHouseId = this.props.appState.house.id;
    const apiPath = `/api/v1/homes/${userHouseId}/devices/`;
    $.get(apiPath, (req) => {
      const devices = req;
      this.props.actions.loadDevices(devices);
    })
    .fail(() => {
      // set local state to display error
      context.setState({
        error: 'Failed to find devices, reload page.',
      });
    });
  }

  clickButton() {
    this.props.actions.addDevice(this.state.device);
  }

  render() {
    if (this.props.appState.isHost) {
      return (
        <DashboardHost appState={this.props.appState} actions={this.props.actions} />
      );
    }
    return (
      <DashboardGuest
        appState={this.props.appState}
        authState={this.props.authState}
        actions={this.props.actions}
      />
    );
  }
}

DashboardPage.propTypes = {
  authState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

