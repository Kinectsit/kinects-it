/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/actions';
import $ from 'jquery';

export class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      catgif: false,
    };
  }

  pingDevice() {
    const context = this;
    const apiPath = '/api/v1/homes/1/devices/ping/00e04c038343';

    $.post(apiPath, (req) => {
      if (!req.success === true) {
        context.setState({
          response: req.message,
        });
      } else {
        context.setState({
          response: 'Success: Device toggled! Note: There is a 30 second delay in the video feed. Dance with fancy cat while you wait.',
          catgif: true,
        });
        setTimeout(() => {
          this.setState({
            response: '',
            catgif: false,
          });
        }, 30000);
      }
    })
    .fail(() => {
      // set local state to display error
      context.setState({
        response: 'Failed to connect to device, try again.',
      });
    });
  }

  render() {
    let wait = (
      <div></div>
    );
    if (this.state.catgif === true) {
      wait = (
        <iframe
          src="//giphy.com/embed/gcBFQCVVGO7ny"
          width="240"
          height="180"
        />
      );
    }

    return (
      <div>
        <div>
          <p>How this works: </p>
          <p>Press the button, and watch the light flash on and off in Krista's house!</p>
          <RaisedButton label="Ping Device" onClick={() => this.pingDevice()} />
          <p>
          {this.state.response}
          </p>
          <p>
          {wait}
          </p>
        </div>
        <div>
          <iframe
            src="http://iframe.dacast.com/b/70291/c/267783"
            width="512"
            height="288"
          />
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  device: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);

