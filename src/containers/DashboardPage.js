import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { DashboardHost } from '../components/DashboardHost';
import { DashboardGuest } from '../components/DashboardGuest';

export class DashboardPage extends React.Component {

  clickButton() {
    this.props.actions.addDevice(this.state.device);
  }

  render() {
    if (this.props.appState.defaultViewHost) {
      return (
        <DashboardHost appState={this.props.appState} />
      );
    }
    return (
      <DashboardGuest appState={this.props.appState} />
    );
  }
}

DashboardPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

