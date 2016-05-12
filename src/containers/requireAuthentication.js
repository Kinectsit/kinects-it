import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

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
            if (response) {
              this.props.actions.setAsAuthenticated(true, response.sessionId);
              this.props.actions.setUser(response.user);
              if (response.host) {
                this.props.actions.setUserAsHost(true);
              } else {
                this.props.actions.setUserAsHost(false);
              }
            } else {
              browserHistory.push('/login');
            }
          })
          .fail((error) => {
            console.log('there was an error:', error);
          });
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
    actions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      authState: state.authState,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch),
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
