import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
// import { pushPath } from 'redux-simple-router';

const LogoutView = class extends React.Component {
  componentWillMount() {
    $.ajax({
      url: '/api/v1/authentication',
      type: 'DELETE',

    }).done((response) => {
      if (response) {
        // if the user session was deleted, then delete from state
        this.props.actions.setAuthentication(false, null);
        this.props.actions.setUserAsHost(null);
        this.props.actions.setUser({});
      } else {
        console.log('the user was not deleted');
      }
    })
    .fail((xhr, status, errorThrown) => {
      console.log('Error: '.concat(errorThrown));
      console.log('Status: '.concat(status));
      console.dir(xhr);
    });
  }

  componentDidMount() {
    browserHistory.push('/login');
  }

  render() {
    return null;
  }
};

LogoutView.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LogoutView);

