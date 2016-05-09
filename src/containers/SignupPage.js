/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { orange500, blue500 } from 'material-ui/styles/colors';
import Formsy from 'formsy-react';
import { FormsyText, FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui/lib';
import $ from 'jquery';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  fieldStyles: {
    width: '100%',
  },
  paperStyle: {
    width: '50%',
    margin: 'auto',
    padding: 20,
  },
  submitStyle: {
    marginTop: 32,
  },
};

export const SignupPage = () => (
  <div>
    <h2>Create an Account with Kinects.It!</h2>
    <FlatButton
      label="Sign Up With Coinbase"
      backgroundColor="#2b71b1"
      hoverColor="#18355C"
      linkButton
      disabled
      href="/api/v1/users/signup"
      style={{ color: 'white' }}
      secondary
      icon={<FontIcon className="material-icons">arrow_right</FontIcon>}
    />
    <SignupForm />
  </div>
);

export class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.errorMessages = {
      emailerror: 'Please provide a valid email',
      passwordError: 'Please enter a password of at least 5 characters',
      nameError: 'Please enter a user name',
      mismatchPassword: 'Your passwords don\'t match',
    };
    this.state = {
      canSubmit: false,
    };
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

  submitForm(data) {
    // need to do this because checkbox components won't fire. Radio buttons work
    // but need to send a boolean to the server
    if (data.host === 'host') {
      data.host = true;
    } else {
      data.host = false;
    }

    $.ajax({
      url: 'http://localhost:3001/api/v1/users/signup',
      dataType: 'json',
      crossDomain: true,
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: (response) => {
        console.log('this was the message back from the server', response);
      },
      error: (xhr, status, err) => {
        console.error('there was an error', status, err.toString());
      },
    });
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    return (
      <Paper style={styles.paperStyle}>
        <Formsy.Form
          onValid={() => this.enableButton()}
          onInvalid={() => this.disableButton()}
          onValidSubmit={(data) => this.submitForm(data)}
          onInvalidSubmit={() => this.notifyFormError()}
          onSuccess={(data) => console.log('request received by the server!', data)}
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
            name="email"
            validations="isEmail"
            validationError={this.errorMessages.emailError}
            required
            style={styles.fieldStyles}
            floatingLabelText="E-mail"
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
          <FormsyText
            name="repeated_password"
            validations="equalsField:password"
            validationError={this.errorMessages.mismatchPassword}
            required
            type="password"
            style={styles.fieldStyles}
            hintText="Must be same as above"
            floatingLabelText="Re-type password"
          />
          <Subheader>Will you be a Host or a Guest</Subheader>
          <FormsyRadioGroup name="host" defaultSelected="host">
            <FormsyRadio
              value="host"
              label="I'm a host"
            />
            <FormsyRadio
              value="guest"
              label="I'm a guest"
            />
          </FormsyRadioGroup>
          <FlatButton
            style={styles.submitStyle}
            type="submit"
            label="Submit"
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
      </Paper>
    );
  }
}

SignupPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);

