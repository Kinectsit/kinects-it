/* eslint max-len: ["error", 150] */
import React from 'react';

import {
  Row,
  Column,
  TopBar,
  TopBarTitle,
  TopBarRight,
  Menu,
  MenuItem,
  ResponsiveNavigation
} from 'react-foundation';


import { NavLink } from './NavLink';

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

export const TitleBar = () => (
  <ResponsiveNavigation className="navbar">
    <Row>
      <Column>
        <TopBarTitle className="navbar__title">Kinects.It</TopBarTitle>
        <TopBarRight className="navbar__right">
          <Menu>
           <MenuItem><NavLink to="/" onlyActiveOnIndex>Home</NavLink></MenuItem>
           <MenuItem><a href="/#how-it-works">How it Works</a></MenuItem>
           <MenuItem><NavLink to="/login">Login</NavLink></MenuItem>
           <MenuItem><NavLink to="/signup">Signup</NavLink></MenuItem>

          </Menu>
        </TopBarRight>
      </Column>
    </Row>
  </ResponsiveNavigation>
);
