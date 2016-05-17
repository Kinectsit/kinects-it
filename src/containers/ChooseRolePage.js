/* eslint-disable no-param-reassign, no-return-assign */
import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import { FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui/lib';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import styles from '../assets/formStyles';
import FlatButton from 'material-ui/FlatButton';

class ChooseRolePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      dialogueOpen: false,
      isHost: true,
    };
  }

  onUserTypeChange(event) {
    if (event.target.value === 'guest') {
      this.setState({
        isHost: false,
      });
    } else {
      this.setState({
        isHost: true,
      });
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

  openErrorMessage() {
    this.messageDialogue.handleOpen();
  }

  submitForm(data) {
    // need to do this because checkbox components won't fire. Radio buttons work
    // but need to send a boolean to the server
    const currentAppState = this.props.authState;
    console.log('appstate:', this.props.authState);
    const userInfo = {
      email: currentAppState.user.email,
      name: currentAppState.user.name,
    };
    if (data.host === 'host') {
      userInfo.host = true;
    } else {
      userInfo.host = false;
    }

    $.ajax({
      url: '/api/v1/users/',
      dataType: 'json',
      crossDomain: true,
      method: 'PUT',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(userInfo),
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
          // Next set authentication
          this.props.actions.setAuthentication(true, response.sessionId);
          this.props.actions.setUser(response.user);
          this.props.actions.loadPayAccounts(response.payAccounts);
          // next reroute to User Dashboard or join rental
          if (response.house) {
            this.props.actions.addHouse(response.house);
            browserHistory.push('dashboard');
          } else {
            browserHistory.push('join-rental');
          }
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
      <div>
        <h2>How do you plan to use the app?</h2>
        <h4>Let us know so we can customize the experience for you</h4>
        <Paper style={styles.paperStyle}>
          <Formsy.Form
            onValid={() => this.enableButton()}
            onInvalid={() => this.disableButton()}
            onValidSubmit={(data) => this.submitForm(data)}
            onInvalidSubmit={() => this.notifyFormError()}
          >
            <Subheader>Will you be a Host or a Guest</Subheader>
            <FormsyRadioGroup
              name="host" defaultSelected="host"
              onChange={(event) => this.onUserTypeChange(event)}
            >
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
      </div>
    );
  }
}

ChooseRolePage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    appState: state.appState,
    authState: state.authState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRolePage);
