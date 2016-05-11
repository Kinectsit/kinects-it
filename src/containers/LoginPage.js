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
      passwordError: 'Please enter a password of at least 5 characters',
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
    const success = (user) => {
      console.log('I have logged in: ', user);
    };

    $.post('http://localhost:3000/api/session',
       JSON.stringify(data),
       success,
       'json'
      )
      .fail((error) => {
        console.log('I failed to login: ', error);
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
            validations="isLength:5"
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

