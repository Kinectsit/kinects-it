import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import {pushState} from 'redux-router';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      console.log('this is the current authState:', this.props.authState);
      if (!this.props.authState.isAuthenticated) {
        browserHistory.push('/login');
        // let redirectAfterLogin = this.props.location.pathname;
        // this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
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
