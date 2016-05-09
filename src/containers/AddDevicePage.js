import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

export class AddDevicePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      device: '',
    };
  }

  captureFormChange(event) {
    this.setState({
      device: event.target.value,
    });
  }

  addDevice() {
    this.props.actions.addDevice(this.state.device);
  }

  render() {
    return (
      <div>
        <h2>AddDevice page</h2>
        <form>
          <input
            type="text"
            name="device"
            placeholder="Add device"
            onChange={(event) => this.captureFormChange(event)}
          />
          <button type="button" onClick={() => this.addDevice()}>ADD DEVICE</button>
        </form>
      </div>
    );
  }
}

AddDevicePage.propTypes = {
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
)(AddDevicePage);

