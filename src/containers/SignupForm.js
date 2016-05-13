/* eslint-disable no-param-reassign, no-return-assign */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import Formsy from 'formsy-react';
import { FormsyText, FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui/lib';
import $ from 'jquery';
import { FormMessageDialogue } from '../components/FormMessageDialogue';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import styles from '../assets/formStyles';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';

class SignupForm extends React.Component {
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
      dialogueOpen: false,
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

  openErrorMessage() {
    this.messageDialogue.handleOpen();
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
      url: 'http://localhost:3001/api/v1/users/',
      dataType: 'json',
      crossDomain: true,
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: (response) => {
        if (!response.login) {
          // server could not add user to the database
          this.openErrorMessage();
        } else {
          // if the response.login is true then user was added
          // first execute action to set user type to host
          if (data.host === true) {
            this.props.actions.setUserAsHost(true);
          } else {
            this.props.actions.setUserAsHost(false);
          }

          // TODO: add user -> home object (id and hostCode properties) to state
          // so that the host code can be displayed in the dashboard page

          // Next set authentication
          this.props.actions.setAsAuthenticated(true, response.sessionId);
          this.props.actions.setUser(response.user);
          // next reroute to User Dashboard
          browserHistory.push('/dashboard');
        }
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
            validations="minLength:5"
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
        <FormMessageDialogue
          ref={(node) => this.messageDialogue = node}
          title="User Already Exists"
          failure
        >
          <p>This email or username already exists.
          Please choose another username or if you already have an account
          you can try and login</p>
        </FormMessageDialogue>
      </Paper>
    );
  }
}

SignupForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

