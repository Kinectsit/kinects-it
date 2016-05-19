/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UsageChart } from '../components/UsageChart';
import { UsageChartLabel } from '../components/UsageChartLabel';
import { TransactionTable } from '../components/TransactionTable';
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
    const homeId = this.props.appState.house.id;
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
      // find the actual name of each device
      for (let j = 0; j < totalPerDevice.length; j++) {
        if (totalPerDevice[j].hardwarekey === transactions[i].deviceid) {
          // update the transactions array for processing in the transaction table component
          transactions[i].name = totalPerDevice[j].name;
          // update the amount per device spent for processing in the usage chart
          if (!totalPerDevice[j].amountspent) {
            totalPerDevice[j].amountspent = parseFloat(transactions[i].amountspent, 10);
          } else {
            totalPerDevice[j].amountspent += parseFloat(transactions[i].amountspent, 10);
          }
        }
      }
      // update the transactions array to include real-language time for processing in the transaction table component
      transactions[i].formattedTime = moment(transactions[i].timestamp).format('MMM Do, YYYY, h:ma');
      // update the transactions array to include real-language amount spent for processing in the transaction table component
      transactions[i].formattedAmount = 0;
      if (transactions[i].timespent <= 359999) {
        const time = Math.floor(transactions[i].timespent / 60000);
        let unit = 'minutes';
        if (time === 1) { unit = 'minute'; }
        transactions[i].formattedAmount = `${time} ${unit}`;
      } else if ((transactions[i].timespent > 35999) && (transactions[i].timespent <= 86399999)) {
        const time = Math.floor(transactions[i].timespent / 360000);
        let unit = 'hours';
        if (time === 1) { unit = 'hour'; }
        transactions[i].formattedAmount = `${time} ${unit}`;
      } else if (transactions[i].timespent > 86400000) {
        const time = Math.floor(transactions[i].timespent / 86400000);
        let unit = 'days';
        if (time === 1) { unit = 'day'; }
        transactions[i].formattedAmount = `${time} ${unit}`;
      }
    }
    console.log(transactions);

    this.setState({
      thisMonthWord,
      totalEarned: totalEarned.toFixed(2),
      totalEarnedThisMonth: totalEarnedThisMonth.toFixed(2),
      totalPerDevice,
      transactions,
    });
  }

  render() {
    let errorMsg = <div style={styles.error}>{this.state.error}</div>;
    let usageChart = <div></div>;
    let usageTable = <div></div>;
    let transactions = <div></div>;
    if (this.state.totalPerDevice.length > 0) {
      usageChart = <div><UsageChart transactions={this.state.totalPerDevice} /></div>;
      usageTable = <div><UsageChartLabel devices={this.state.totalPerDevice} /></div>;
      transactions = <div><TransactionTable transactions={this.state.transactions} /></div>;
    }

    return (
      <div>
        <h1>Usage Stats</h1>
        {errorMsg}
        <p>Total Earned: ${this.state.totalEarned}</p>
        <p>Total Earned in {this.state.thisMonthWord}: ${this.state.totalEarnedThisMonth}</p>
        <h2>Top Performers</h2>
        {usageChart}
        {usageTable}
        <h2>Transactions Log</h2>
        {transactions}
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

