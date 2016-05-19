import React from 'react';
// import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import SignupForm from '../containers/SignupForm';

export const Home = () => (
  <div>
    <div className="fullscreen-bg">
      <video
        loop
        muted
        autoPlay
        poster="./assets/videos/videoframe.png"
        className="fullscreen-bg__video"
      >
        <source src="../assets/videos/kinectsit.webmhd.webm" type="video/webm" />
        <source src="../assets/videos/kinectsit.mp4" type="video/mp4" />
        <source src="../assets/videos/kinectsit.oggtheora.ogv" type="video/ogg" />
      </video>
    </div>
    <FlatButton
      label="Get Started"
      hoverColor="#18355C"
      linkButton
      href="/signup"
      style={{ color: 'white' }}
      secondary
    />
  </div>
);
