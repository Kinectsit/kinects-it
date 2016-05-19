import React, { PropTypes } from 'react';
import rd3 from 'rd3';

const PieChart = rd3.PieChart;

export class UsageChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pieData: [{}],
    };
  }

  componentWillMount() {
    const values = [];
    let total = 0;
    for (let i = 0; i < this.props.transactions.length; i++) {
      total += this.props.transactions[i].amountspent;
    }
    for (let j = 0; j < this.props.transactions.length; j++) {
      const newObj = {};
      newObj.label = this.props.transactions[j].name;
      newObj.value = Math.floor(total * 10 / this.props.transactions[j].amountspent);
      values.push(newObj);
    }
    this.setState({
      pieData: values,
    });
  }

  render() {
    return (
      <div>
        <PieChart
          data={this.state.pieData}
          width={450}
          height={400}
          radius={110}
          innerRadius={20}
          hoverAnimation={false}
          sectorBorderColor="white"
        />
      </div>
    );
  }
}


UsageChart.propTypes = {
  transactions: PropTypes.array.isRequired,
};

