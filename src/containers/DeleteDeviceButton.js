import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import RaisedButton from 'material-ui/RaisedButton';
// import { browserHistory } from 'react-router';
// import $ from 'jquery';

export class DeleteDeviceButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  leaveHome() {
    console.log('click!');
    // const userId = this.props.authState.user.id;
    // const houseId = this.props.appState.house.id;
    // const urlPath = '/api/v1/users/'.concat(userId).concat('/homes/').concat(houseId);

    // $.ajax({
    //   url: urlPath,
    //   dataType: 'json',
    //   crossDomain: true,
    //   method: 'DELETE',
    //   contentType: 'application/json; charset=utf-8',
    //   success: () => {
    //     // send user to dashboard and new list of devices will populate
    //     browserHistory.push('/dashboard');
    //   },
    //   error: (/* xhr, status, err */) => {
    //     this.setState({ error: 'Error leaving device - please try again in a few minutes.' });
    //   },
    // });
  }

  render() {
    return (
      <div>
        <p><RaisedButton label="Delete Device" onClick={() => (this.leaveHome())} /></p>
        <p>Warning: This action can not be undone.</p>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

DeleteDeviceButton.propTypes = {
  actions: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authState: state.authState,
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
)(DeleteDeviceButton);

