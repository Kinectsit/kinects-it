/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRowColumn, TableRow } from 'material-ui/Table';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import moment from 'moment';

export class TransactionTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.transactions,
    };
  }

  componentWillMount() {
    this.sortByColumn('date');
  }

  sortByColumn(column) {
    const sortedData = this.state.data;

    if (column === 'name') {
      sortedData.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      });
    }

    if (column === 'timespent') {
      sortedData.sort((a, b) => a.timespent - b.timespent);
    }

    if (column === 'date') {
      sortedData.sort((a, b) => {
        const timeA = moment(a.timestamp).format('x');
        const timeB = moment(b.timestamp).format('x');
        return timeB - timeA;
      });
    }

    if (column === 'amountspent') {
      sortedData.sort((a, b) => {
        const amountA = parseFloat(a.amountspent, 10);
        const amountB = parseFloat(b.amountspent, 10);
        return amountA - amountB;
      });
    }

    this.setState({
      data: sortedData,
    });
  }

  render() {
    return (
      <div>
        <Table style={{ width: '600px' }}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{ width: '150px', paddingLeft: '0px', color: 'black' }}>
                <SortIcon color={'black'} id={"date"} onClick={(e) => this.sortByColumn(e.target.id)} />
                Date
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '150px', paddingLeft: '0px', color: 'black' }}>
                <SortIcon color={'black'} id={"name"} onClick={(e) => this.sortByColumn(e.target.id)} />
                Name
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '100px', paddingLeft: '0px', color: 'black' }}>
                <SortIcon color={'black'} id={"timespent"} onClick={(e) => this.sortByColumn(e.target.id)} />
                Usage
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '100px', paddingLeft: '0px', color: 'black' }}>
                <SortIcon color={'black'} id={"amountspent"} onClick={(e) => this.sortByColumn(e.target.id)} />
                Payment
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.data.map((transaction, index) =>
              <TableRow key={index} style={{ color: 'black' }}>
                <TableRowColumn style={{ width: '200px' }}>{transaction.formattedTime}</TableRowColumn>
                <TableRowColumn style={{ width: '150px' }}>{transaction.name}</TableRowColumn>
                <TableRowColumn style={{ width: '100px' }}>{transaction.formattedAmount}</TableRowColumn>
                <TableRowColumn style={{ width: '100px' }}>${transaction.amountspent}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};

