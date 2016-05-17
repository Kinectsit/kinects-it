import React, { PropTypes } from 'react';
import rd3 from 'rd3';
const BarChart = rd3.BarChart;


export class DeviceChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      barData: [
        {
          values: [
            { x: 1, y: 91 },
            { x: 2, y: 290 },
            { x: 3, y: 30 },
          ],
        },
      ],
    };
  }

  componentWillMount() {
    const length = Math.min(this.props.transactions.length, 6);
    const values = [];
    for (let i = 0; i < length; i++) {
      const newObj = {};
      newObj.x = this.props.transactions[i].timestamp;
      newObj.y = this.props.transactions[i].amountspent;
      values.push(newObj);
    }
    this.setState({
      barData: [
        {
          values,
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <BarChart
          data={this.state.barData}
          width={700}
          height={200}
          fill={'#3182bd'}
          title="Bar Chart"
          xAxisLabel="Recent Transactions"
          yAxisLabel="Amount Spent"
        />
      </div>
    );
  }
}


DeviceChart.propTypes = {
  transactions: PropTypes.array.isRequired,
};

