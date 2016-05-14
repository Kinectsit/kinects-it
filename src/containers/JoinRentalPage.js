import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { browserHistory } from 'react-router';
import $ from 'jquery';

export class JoinRentalPage extends React.Component {

  componentDidMount() {
    this.props.actions.addRental('');
  }

  captureFormChange(event) {
    this.setState({
      rental: event.target.value,
    });
  }

  addRental(data) {
    console.log('props in JoinRentalPage: ', this.props);
    // const userId = this.props.
    $.ajax({
      url: '/users/:id/homes/:code',
      dataType: 'json',
      crossDomain: true,
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: (response) => {
        console.log('response to /users/:id/homes/:code is: ', response);
        if (!response.login) {
          // server could not log user in, show error
          this.setState({ error: 'INVALID_LOGIN' });
        } else {
          this.props.actions.setAuthentication(true, response.sessionId);
          this.props.actions.setUser(response.user);
          if (response.host) {
            this.props.actions.setUserAsHost(true);
            this.props.actions.addHouse(response.house);
          } else {
            this.props.actions.setUserAsHost(false);
          }

          this.props.actions.addRental(this.state.rental);
          // send user to dashboard page if successful response
          browserHistory.push('/dashboard');
        }
      },
      error: (/* xhr, status, err */) => {
        this.setState({ error: 'INVALID_JOIN_RENTAL' });
      },
    });
  }

  render() {
    return (
      <div>
        <h2>Join new rental</h2>
        <form>
          <input
            type="text"
            name="device"
            placeholder="New rental"
            onChange={(event) => this.captureFormChange(event)}
          />
          <button type="button" onClick={() => this.addRental()}>ADD RENTAL</button>
        </form>
        <h1>Current Rental is: {this.props.appState.houseName}</h1>
      </div>
    );
  }
}


JoinRentalPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinRentalPage);

