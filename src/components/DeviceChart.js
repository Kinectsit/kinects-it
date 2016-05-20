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
    const now = Date.now();
    const thisMonth = moment(now).format('MM');
    const lastFiveMonths = [];

    // find the last five months, and push the month into an array
    for (let i = thisMonth; i > thisMonth - 5; i--) {
      if (i > 0) {
        const currentMonth = JSON.stringify(i);
        const displayMonth = moment(currentMonth).format('MMM');
        lastFiveMonths.push({ x: displayMonth, y: 0 });
      }
    }
    if (thisMonth < 5) {
      const neg = 5 - thisMonth;
      for (let j = 12; j > 12 - neg; j--) {
        const currentMonth = JSON.stringify(j);
        const displayMonth = moment(currentMonth).format('MMM');
        lastFiveMonths.push({ x: displayMonth, y: 0 });
      }
    }
    for (let k = 0; k < this.props.transactions.length; k++) {
      const month = moment(this.props.transactions[k].timestamp).format('MMM');
      for (let l = 0; l < lastFiveMonths.length; l++) {
        if (month === lastFiveMonths[l].x) {
          lastFiveMonths[l].y += parseInt(this.props.transactions[k].amountspent, 10);
        }
      }
    }
    this.setState({
      barData: [{ values: lastFiveMonths }],
    });
  }

  render() {
    return (
      <div>
        <BarChart
          data={this.state.barData}
          width={600}
          height={300}
          fill={'#3182bd'}
        />
      </div>
    );
  }
}


DeviceChart.propTypes = {
  transactions: PropTypes.array.isRequired,
};

