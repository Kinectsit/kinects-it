/* eslint max-len: ["error", 150] */
import React from 'react';
import { NavLink } from './NavLink';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
// import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// import {
//   Row,
//   Column,
//   TopBarTitle,
//   TopBarRight,
//   Menu,
//   MenuItem,
//   ResponsiveNavigation,
// } from 'react-foundation';

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
        <RaisedButton
          label="Open Drawer"
          onTouchTap={this.handleToggle.bind(this)}
        />

        <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({ open })} >
          <Menu>
            <MenuItem><NavLink to="/" onlyActiveOnIndex>Home</NavLink></MenuItem>
            <MenuItem><a href="/#how-it-works">How it Works</a></MenuItem>
            <MenuItem><NavLink to="/login">Login</NavLink></MenuItem>
            <MenuItem><NavLink to="/signup">Signup</NavLink></MenuItem>
          </Menu>
        </Drawer>

      </div>
    );
  }
}

// export const TitleBar = () => (
//   <div className="title-bar-container">

//     <div className="title-bar hide-for-medium" id="shits-and-giggles">
//       <div className="title-bar-right">
//         <span className="title-bar-title position-left">Kinects.It</span>
//         <button className="menu-icon" type="button" data-toggle="offCanvasRight" aria-expanded="false" aria-controls="offCanvasRight">
//         </button>
//       </div>
//     </div>

//     <nav id="widemenu" className="top-bar show-for-medium">
//       <div className="top-bar-title">Kinects.It</div>
//       <div className="top-bar-right">
//         <ul className="menu" role="navigation">
//           <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
//           <li><a href="/#how-it-works">How it Works</a></li>
//           <li><NavLink to="/login">Login</NavLink></li>
//           <li><NavLink to="/signup">Signup</NavLink></li>
//         </ul>
//       </div>
//     </nav>

//   </div>
// );

// export const TitleBar = () => (
//   <ResponsiveNavigation titleBarTitle="Kinects.It"className="navbar">
//     <Row>
//       <Column>
//         <TopBarTitle className="navbar__title">Kinects.It</TopBarTitle>
//         <TopBarRight className="navbar__right">
//           <Menu>
//             <MenuItem><NavLink to="/" onlyActiveOnIndex>Home</NavLink></MenuItem>
//             <MenuItem><a href="/#how-it-works">How it Works</a></MenuItem>
//             <MenuItem><NavLink to="/login">Login</NavLink></MenuItem>
//             <MenuItem><NavLink to="/signup">Signup</NavLink></MenuItem>

//           </Menu>
//         </TopBarRight>
//       </Column>
//     </Row>
//   </ResponsiveNavigation>
// );
