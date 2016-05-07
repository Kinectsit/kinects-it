import React, { PropTypes } from 'react';

export const HomeUsage = () => (
  <div>
    <h1>Home Usage Page</h1>
  </div>
);

HomeUsage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

