import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import kinectsitTheme from '../assets/kinectsitTheme';

export class LeaveHomeButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  leaveHome(data) {
    const userId = this.props.authState.user.id;
    const houseId = this.props.appState.house.id;
    const urlPath = '/api/v1/users/'.concat(userId).concat('/homes/').concat(houseId);

    $.ajax({
      url: urlPath,
      dataType: 'json',
      crossDomain: true,
      method: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: () => {
        // remove house from state and send user to dashboard if successful response
        this.props.actions.addHouse({});
        browserHistory.push('/join-rental');
      },
      error: (/* xhr, status, err */) => {
        this.setState({ error: 'Error leaving house - please try again in a few minutes.' });
      },
    });
  }

  render() {
    return (
      <div className="medium-10 medium-centered columns">
        <RaisedButton
          style={
            {
              width: '100%',
              backgroundColor: kinectsitTheme.palette.alert1Color,
              padding: '10px',
            }
          }
          backgroundColor={kinectsitTheme.palette.alert1Color}
          label="Leave Home"
          onClick={() => (this.leaveHome())}
        />
        {this.state.error}
      </div>
    );
  }
}

LeaveHomeButton.propTypes = {
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
)(LeaveHomeButton);

