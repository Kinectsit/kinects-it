import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';

const App = (props) => (
  <div>
    <h1>Hello</h1>
    <IndexLink to="/">Home</IndexLink>
    <br />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;

