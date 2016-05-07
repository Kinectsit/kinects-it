import React from 'react';
import { LandingPageView } from '../views/LandingPageView';

// for now this is pretty simple, but I'm thinking that we will place components in here
// depending on the status of the client (e.g. logged in or not)
export const Home = () => (
  <div>
    <h1>Welcome to Kinects.It!</h1>
    <LandingPageView />
  </div>
);

