import React from 'react';
import SignupForm from '../containers/SignupForm';
import { Card, CardTitle } from 'material-ui/Card';

export const SignupPage = () => (
  <div className="medium-10 columns medium-centered">
    <Card
      className="card"
      style={{
        boxShadow: 'none',
        textAlign: 'center',
        backgroundColor: 'none',
      }}
    >
      <CardTitle
        title="Create an Account with Kinects.It!"
      />
    </Card>
    <SignupForm />
  </div>
);
