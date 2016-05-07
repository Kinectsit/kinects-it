import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
// import {Link} from 'react-router';

export const LandingPageView = () => (
  <div>
    <h2 id="how-it-works">Here's how it works</h2>
    <RaisedButton label="Get Started" />
  </div>
);

LandingPageView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageView);

