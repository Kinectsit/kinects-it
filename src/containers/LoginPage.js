import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import styles from '../assets/formStyles';
// import { browserHistory } from 'react-router';
import $ from 'jquery';


export const LoginPage = () => (
  <div>
    <h2>Login to your account</h2>

    <LoginForm />
  </div>
);

export class LoginForm extends React.Component {
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
      url: 'http://localhost:3001/api/v1/session/',
      dataType: 'json',
      crossDomain: true,
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: (response) => {
        if (!response.login) {
          // server could not add user to the database
        }
        console.log('this was the message back from the server', response);
      },
      error: (xhr, status, err) => {
        console.error('there was an error', status, err.toString());
      },
    });
  }

  formErrorMessage(error) {
    let msg = null;
    if (error === 'INVALID_SUBMIT') {
      msg = 'Please resolve invalid input and try again.';
    }

    return msg;
  }

  render() {
    let errorMsg = '';
    if (this.state.error) {
      errorMsg = <div style={styles.error}>{this.formErrorMessage(this.state.error)}</div>;
    }

    return (
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
    );
  }
}

LoginPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

