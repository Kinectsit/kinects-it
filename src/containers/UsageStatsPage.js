import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UsageChart } from '../components/UsageChart';
import { UsageChartLabel } from '../components/UsageChartLabel';
import * as actions from '../actions/actions';
import styles from '../assets/formStyles';
import moment from 'moment';
import $ from 'jquery';

export class UsageStatsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      thisMonthWord: '',
      totalEarned: '',
      totalEarnedThisMonth: '',
      totalPerDevice: [],
      deviceTransactions: [],
    };
  }

  componentDidMount() {
    console.log('====PROPS ARE ', this.props.appState);
    const homeId = this.props.appState.house.id;
    console.log('in component did mount, homeId is ', homeId);

    const urlPath = '/api/v1/homes/'.concat(homeId).concat('/usage/');

    $.ajax({
      url: urlPath,
      dataType: 'json',
      crossDomain: true,
      method: 'GET',
      contentType: 'application/json; charset=utf-8',
      success: (data) => {
        this.calculations(data);
      },
      error: (/* xhr, status, err */) => {
        this.setState({ error: 'Error loading device stats. Do you need to add a device?' });
      },
    });
  }

  calculations(data) {
    const transactions = data.transactions;
    const thisMonth = moment(Date.now()).format('MM');
    const thisMonthWord = moment(Date.now()).format('MMMM');

    // set initial states if there are no devices
    let totalEarned = 0;
    let totalEarnedThisMonth = 0;
    const totalPerDevice = data.devices;

    for (let i = 0; i < transactions.length; i++) {
      // add to total earned
      totalEarned += parseInt(transactions[i].amountspent, 10);
      // add to total earned this month if matching month
      if (moment(transactions[i].timestamp).format('MM') === thisMonth) {
        totalEarnedThisMonth += parseFloat(transactions[i].amountspent, 10);
      }
      // add to total per device object
      // let found = false;
      for (let j = 0; j < totalPerDevice.length; j++) {
        if (totalPerDevice[j].hardwarekey === transactions[i].deviceid) {
          if (!totalPerDevice[j].amountspent) {
            totalPerDevice[j].amountspent = parseFloat(transactions[i].amountspent, 10);
          } else {
            totalPerDevice[j].amountspent += parseFloat(transactions[i].amountspent, 10);
          }
        }
      }
    }
    console.log(totalPerDevice);
    this.setState({
      thisMonthWord,
      totalEarned: totalEarned.toFixed(2),
      totalEarnedThisMonth: totalEarnedThisMonth.toFixed(2),
      totalPerDevice,
    });
  }

  render() {
    let errorMsg = <div style={styles.error}>{this.state.error}</div>;
    let usageChart = <div></div>;
    let usageTable = <div></div>;
    if (this.state.totalPerDevice.length > 0) {
      usageChart = <div><UsageChart transactions={this.state.totalPerDevice} /></div>;
      usageTable = <div><UsageChartLabel devices={this.state.totalPerDevice} /></div>
    }

    return (
      <div>
        <h1>Usage Stats</h1>
        {errorMsg}
        <h2>Total Earned: ${this.state.totalEarned}</h2>
        <h2>Total Earned in {this.state.thisMonthWord}: ${this.state.totalEarnedThisMonth}</h2>
        {usageChart}
        {usageTable}
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

