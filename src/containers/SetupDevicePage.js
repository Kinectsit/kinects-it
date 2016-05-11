import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../actions/actions';
// import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import styles from '../assets/formStyles';
import Formsy from 'formsy-react';
import { FormsyText, FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui/lib';
import $ from 'jquery';

export class SetupDevicePage extends React.Component {
  constructor(props) {
    super(props);
    this.errorMessages = {
      configError: 'Your device was not configured correctly. Please go back to previous page.',
      nameError: 'Please provide a valid name',
      descriptionError: 'Please enter a valid description',
      priceError: 'Please enter time and price options',
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
    const device = data;
    device.id = this.props.appState.configuredDevice.id;

    const apiPath = 'http://localhost:3001/api/v1/homes/1/devices/add/'.concat(device.id);

    $.post(apiPath, device, () => {
      this.props.actions.setFeatured(device);
      browserHistory.push('/deviceProfile');
    })
    .fail((error) => {
      console.log(error);
    });
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    if (this.props.appState.configuredDevice.id === '') {
      return (
        <div style={styles.center}>
          <h2>Uh oh!</h2>
          {this.errorMessages.configError}
        </div>
      );
    }
    return (
      <div>
        <div style={styles.center}>
          <h2>Set up Device</h2>
          You must complete this form to add the device to your house.
        </div>
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
              floatingLabelText="Device Name"
            />
            <FormsyText
              name="description"
              validations="isExisty"
              validationError={this.errorMessages.descriptionError}
              required
              style={styles.fieldStyles}
              floatingLabelText="Device Description"
            />
            <Subheader>Pricing Options</Subheader>
            <FormsyRadioGroup name="price" defaultSelected="15">
              <FormsyRadio
                value="15"
                label="15 minutes"
              />
              <FormsyRadio
                value="60"
                label="1 hour"
              />
              <FormsyRadio
                value="1440"
                label="1 day"
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

SetupDevicePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SetupDevicePage);

