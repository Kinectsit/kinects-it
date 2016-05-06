import React from 'react';
import { Row, Column } from 'react-foundation';
import RaisedButton from 'material-ui/RaisedButton';
// import {Link} from 'react-router';

export const LandingPageView = () => (
  <div>
    <Row>
      <Column>
        <h2 id="how-it-works">Here's how it works</h2>
        <RaisedButton label="Get Started" />
      </Column>
    </Row>
  </div>
);
