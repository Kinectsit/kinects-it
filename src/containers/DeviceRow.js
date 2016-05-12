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
    let active = '';
    if (this.props.device.isActive) {
      active = 'Active';
    } else {
      active = 'Not Active';
    }

    if (this.props.appState.defaultViewHost) {
      return (
        <div>
          <li>Name: {this.props.device.name}</li>
          <li>Is Active: {active}</li>
          <NavLink to="/device-profile">
            <RaisedButton label="View Host Device Dashboard" onClick={() => this.setFeatured()} />
          </NavLink>
        </div>
      );
    }
    return (
      <div key={this.props.device.id}>
        <li>Name: {this.props.device.name}</li>
        <li>Is Active: {active}</li>
        <NavLink to="/device">
          <RaisedButton label="View Guest Device Dashboard" onClick={() => this.setFeatured()} />
        </NavLink>
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

