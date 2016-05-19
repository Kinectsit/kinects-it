import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import styles from '../assets/formStyles';
import $ from 'jquery';

export class UsageStatsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      deviceTransactions: [],
    };
  }

  componentDidMount() {
    const homeId = this.props.appState.house.id;
    console.log('in component did mount, homeId is ', homeId);

    const urlPath = '/api/v1/homes/'.concat(homeId).concat('/usage/');

    $.ajax({
      url: urlPath,
      dataType: 'json',
      crossDomain: true,
      method: 'GET',
      contentType: 'application/json; charset=utf-8',
      success: (result) => {
        this.setState({
          deviceTransactions: result,
        });
      },
      error: (/* xhr, status, err */) => {
        this.setState({ error: 'Error leaving house - please try again in a few minutes.' });
      },
    });
  }


  render() {
    let errorMsg = <div style={styles.error}>{this.state.error}</div>;

    return (
      <div>
        <h1>Usage Stats</h1>
        {errorMsg}
        <h2>???</h2>
        {JSON.stringify(this.state.deviceTransactions)}
      </div>
    );
  }
}


UsageStatsPage.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsageStatsPage);

