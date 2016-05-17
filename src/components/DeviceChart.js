import React, { PropTypes } from 'react';
import rd3 from 'rd3';
const BarChart = rd3.BarChart;

const barData = [
  {
    name: 'Series A',
    values: [
      { x: 1, y: 91 },
      { x: 2, y: 290 },
      { x: 3, y: 30 },
      { x: 4, y: 50 },
      { x: 5, y: 90 },
      { x: 6, y: 100 },
    ],
  },
];

export class DeviceChart extends React.Component {

  componentWillMount() {
    console.log(JSON.stringify(this.props.transactions));
  }

  render() {
    return (
      <div>
        <BarChart
          data={barData}
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

