import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      console.log('this is the current authState:', this.props.authState);
      if (!this.props.authState.isAuthenticated) {
        // current local state not authenticated
        // check with server if current session is authenticated
        $.get('/api/v1/authentication')
          .done((response) => {
            console.log('response from server when trying to authenticate:', response);
          })
          .fail((error) => {
            console.log('there was an error:', error);
          });
          // if authenticated then continue to route
          // else redirect to the login page
        // browserHistory.push('/login');
      }
    }

    render() {
      return (
        <div>
            {this.props.authState.isAuthenticated === true
              ? <Component {...this.props} />
              : null
            }
        </div>
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    authState: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      authState: state.authState,
    };
  }

  // const mapStateToProps = (state) => ({
  //   token: state.auth.token,
  //   userName: state.auth.userName,
  //   isAuthenticated: state.auth.isAuthenticated,
  // });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
