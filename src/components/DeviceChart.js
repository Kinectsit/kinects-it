import React, { PropTypes } from 'react';
import rd3 from 'rd3';
import moment from 'moment';

const BarChart = rd3.BarChart;


export class DeviceChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      barData: [{ values: [{}] }],
    };
  }

  componentWillMount() {
    const arrayLength = this.props.transactions.length - 1;
    const chartLength = arrayLength - (Math.min(this.props.transactions.length, 5));
    const values = [];
    for (let i = arrayLength; i > chartLength; i--) {
      const newObj = {};
      const time = this.props.transactions[i].timestamp;
      const formattedTime = moment(time).format('MMMM D, h:mm');
      newObj.x = formattedTime;
      newObj.y = this.props.transactions[i].amountspent;
      values.push(newObj);
    }
    this.setState({
      barData: [{ values }],
    });
  }

  render() {
    return (
      <div>
        <BarChart
          data={this.state.barData}
          width={650}
          height={400}
          fill={'#3182bd'}
          title="Bar Chart"
          xAxisLabel="Recent Transactions"
          yAxisLabel="Amount Spent in $"
        />
      </div>
    );
  }
}


DeviceChart.propTypes = {
  transactions: PropTypes.array.isRequired,
};

