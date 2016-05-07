/* eslint max-len: ["error", 150] */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { NavMenu } from './NavMenu';

export class TitleBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="title-bar-container">
        <AppBar
          title="Kinects.It"
          onLeftIconButtonTouchTap={() => this.handleToggle()}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <NavMenu onClick={() => this.handleClose()} />
        </Drawer>

      </div>
    );
  }
}
