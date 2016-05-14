import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink } from '../components/NavLink';

export class DeviceRow extends React.Component {

  setFeatured() {
    this.props.actions.setFeatured(this.props.device);
  }

  render() {
    let active = 'Active';
    let guestButton = (
      <div>Device is currently on - come back later to access options.</div>
    );

    if (this.props.device.isactive === false) {
      active = 'Not Active';
      guestButton = (
        <NavLink to="/device">
          <RaisedButton label="Purchase Usage" onClick={() => this.setFeatured()} />
        </NavLink>
      );
    }

    if (this.props.appState.isHost) {
      return (
        <div>
          <li>Name: {this.props.device.name}</li>
          <li>Is Active: {active}</li>
          <NavLink to="/device-profile">
            <RaisedButton label="Device Options" onClick={() => this.setFeatured()} />
          </NavLink>
        </div>
      );
    }
    return (
      <div key={this.props.device.id}>
        <li>Name: {this.props.device.name}</li>
        <li>Is Active: {active}</li>
        {guestButton}
      </div>
    );
  }
}

DeviceRow.propTypes = {
  device: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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
)(DeviceRow);

