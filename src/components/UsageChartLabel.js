import React, { PropTypes } from 'react';
import { Table, TableBody, TableRowColumn, TableRow } from 'material-ui/Table';

export const UsageChartLabel = (props) => (
  <div style={{ width: '300px' }}>
    <Table>
      <TableBody displayRowCheckbox={false}>
        {props.devices.map((device, index) =>
          <TableRow key={index} style={{ color: 'black' }}>
            <TableRowColumn style={{ width: '200px' }}>{device.name}</TableRowColumn>
            <TableRowColumn>${device.amountspent}</TableRowColumn>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

UsageChartLabel.propTypes = {
  devices: PropTypes.array.isRequired,
};
