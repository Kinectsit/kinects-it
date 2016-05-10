import React from 'react';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export const Home = () => (
  <div>
    <Card>
      <CardMedia
        overlay={
          <div>
            <CardTitle title="Bringing the Internet of Things into your home." />
            <CardActions>
              <FlatButton label="Get Started" linkButton="true" href="/login" />
            </CardActions></div>}
      >
        <img src="/../assets/tech.jpg" role="presentation" />
      </CardMedia>
    </Card>

    <div style={{ textAlign: 'center' }}>
      <h2 id="how-it-works">Here's how it works</h2>
      <div>
        <i className="material-icons">graphic_eq</i>
      </div>
      <div>
        Attach a device to your home.
      </div>
      <div>
        <i className="material-icons">arrow_downward</i>
      </div>
      <div>
        <i className="material-icons">signal_wifi_4_bar</i>
      </div>
      <div>
        Connect the device
      </div>
      <div>
        <i className="material-icons">arrow_downward</i>
      </div>
      <div>
        <i className="material-icons">person_add</i>
      </div>
      <div>
        Guests are added to your domicile.
      </div>
      <div>
        <i className="material-icons">arrow_downward</i>
      </div>
      <div>
        <i className="material-icons">insert_emoticon</i>
      </div>
      <div>
        That's it!
      </div>
      <RaisedButton label="Get Started" primary="true" linkButton="true" href="/login" />
    </div>
  </div>
);

