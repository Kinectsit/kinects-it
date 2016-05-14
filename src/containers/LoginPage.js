import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import styles from '../assets/formStyles';
import { browserHistory } from 'react-router';
import $ from 'jquery';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.errorMessages = {
      passwordError: 'Please enter a password of at least 5 characters dummy',
      nameError: 'Please enter a user name',
      submitError: 'Please resolve invalid input and try again',
    };
    this.state = {
      canSubmit: false,
      error: '',
    };
  }

  /**
    Called by onBlur and onChange of form to determine if submit button
    should be enabled or not
  */
  onTextChange(event) {
    if (event.target.value.length > 0) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  login(data) {
    $.ajax({
      url: '/api/v1/session/',
      dataType: 'json',
      crossDomain: true,
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: (response) => {
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
          // send user to dashboard page if successful response
          browserHistory.push('/dashboard');
        }
      },
      error: (/* xhr, status, err */) => {
        this.setState({ error: 'INVALID_LOGIN' });
      },
    });
  }

  formErrorMessage(error) {
    let msg = null;
    if (error === 'INVALID_SUBMIT') {
      msg = 'Please resolve invalid input and try again.';
    } else if (error === 'INVALID_LOGIN') {
      msg = 'Login attempt failed, please try again';
    }

    return msg;
  }

  render() {
    let errorMsg = '';
    if (this.state.error) {
      errorMsg = <div style={styles.error}>{this.formErrorMessage(this.state.error)}</div>;
    }

    return (
      <div>
        <h2>Login to your account</h2>
        <Paper style={styles.paperStyle}>
          {errorMsg}
          <Formsy.Form
            onValid={() => this.enableButton()}
            onInvalid={() => this.disableButton()}
            onValidSubmit={(data) => this.login(data)}
            onInvalidSubmit={this.errorMessages.submitError}
            autoComplete="off"
          >
            <FormsyText
              name="name"
              validations="isExisty"
              validationError={this.errorMessages.nameError}
              required
              style={styles.fieldStyles}
              floatingLabelText="User Name"
            />
            <FormsyText
              name="password"
              validations="minLength:5"
              validationError={this.errorMessages.passwordError}
              required
              type="password"
              style={styles.fieldStyles}
              hintText="Minimum 5 characters"
              floatingLabelText="Password"
            />
            <div style={styles.center}>
              <FlatButton
                style={styles.submitStyle}
                type="submit"
                label="Login"
                disabled={!this.state.canSubmit}
              />
            </div>
          </Formsy.Form>
        </Paper>
      </div>
    );
  }
}

LoginPage.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

