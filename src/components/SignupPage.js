import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import SignupForm from '../containers/SignupForm';
import $ from 'jquery';

export class SignupPage extends React.Component {
  onClick() {
    $.ajax({
      url: '/api/v1/auth/coinbase',
      dataType: 'jsonp',
      method: 'GET',
    }).done((data) => {
      console.log('message received from server!', data);
    });
  }
  render() {
    return (
      <div>
        <h2>Create an Account with Kinects.It!</h2>
        <FlatButton
          label="Sign Up With Coinbase"
          backgroundColor="#2b71b1"
          hoverColor="#18355C"
          linkButton
          // onMouseUp={() => this.onClick()}
          // onTouchEnd={() => this.onClick()}
          href="/api/v1/auth/coinbase"
          style={{ color: 'white' }}
          secondary
          icon={<FontIcon className="material-icons">arrow_right</FontIcon>}
        />
        <SignupForm />
      </div>
    );
  }
}
