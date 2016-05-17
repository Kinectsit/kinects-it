import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { DeviceRow } from '../containers/DeviceRow';
import $ from 'jquery';

export class DeviceList extends React.Component {

  componentDidMount() {
    const userHouseId = this.props.appState.house.id;
    const urlPath = '/api/v1/homes/'.concat(userHouseId).concat('/devices');

    $.ajax({
      url: urlPath,
      dataType: 'json',
      crossDomain: true,
      method: 'GET',
      contentType: 'application/json; charset=utf-8',
      success: (result) => {
        this.props.actions.loadDevices(result);
      },
      error: (/* xhr, status, err */) => {
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Device List </h1>
        <ul>
          {this.props.appState.devices.map((device, index) =>
            <div key={index}>
              <DeviceRow
                device={device}
                appState={this.props.appState}
                actions={this.props.actions}
              />
            </div>
          )}
        </ul>
      </div>
    );
  }
}

DeviceList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);

