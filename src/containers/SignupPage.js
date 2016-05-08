import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { orange500, blue500 } from 'material-ui/styles/colors';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

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

  // submitForm(data) {
  //   alert(JSON.stringify(data, null, 4));
  // }

  // notifyFormError(data) {
  //   console.error('Form error:', data);
  // }

  render() {
    return (
      <Paper style={styles.paperStyle}>
        <Formsy.Form
          onValid={() => this.enableButton()}
          onInvalid={() => this.disableButton()}
          onValidSubmit={() => this.submitForm()}
          onInvalidSubmit={() => this.notifyFormError()}
        >
          <FormsyText
            name="email"
            validations="isEmail"
            validationError={this.errorMessages.emailerror}
            required
            style={styles.fieldStyles}
            hintText="myname@google.com"
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
            floatingLabelText="password"
          />
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
  // actions: PropTypes.object.isRequired,
  // appState: PropTypes.object.isRequired,
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

