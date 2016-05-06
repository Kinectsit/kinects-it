import React, { PropTypes } from 'react';

import { TitleBar } from './TitleBar';
// import { NavLink } from './NavLink';

// need these for foundation javascript functions like mobile slide menu
import '../../node_modules/foundation-sites/js/foundation.core.js';
import '../../node_modules/foundation-sites/js/foundation.offcanvas.js';
import '../../node_modules/foundation-sites/js/foundation.util.mediaQuery.js';
import '../../node_modules/foundation-sites/js/foundation.util.triggers.js';
import '../../node_modules/foundation-sites/js/foundation.util.motion.js';
import '../../node_modules/foundation-sites/js/foundation.responsiveToggle.js';

/**
* This is an import the global styles sheet.
* Webpack combines this and ouputs as a unique stylesheet when run
*/
import '../assets/scss/app.scss';

export const App = (props) => (
  <div className="app-container">
    <TitleBar />
    <div className="off-canvas-content" data-off-canvas-content>
      {props.children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
  route: PropTypes.object,
};
