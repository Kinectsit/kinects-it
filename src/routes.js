import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './components/App';
import { Home } from './components/Home';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import DashboardPage from './containers/DashboardPage';
import AddDevicePage from './containers/AddDevicePage';
import SetupDevicePage from './containers/SetupDevicePage';
import DeviceProfilePage from './containers/DeviceProfilePage';
import HomeUsage from './components/HomeUsage';
import JoinRentalPage from './containers/JoinRentalPage';
import DevicePage from './containers/DevicePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/add-device" component={AddDevicePage} />
    <Route path="/setup-device" component={SetupDevicePage} />
    <Route path="/device-profile" component={DeviceProfilePage} />
    <Route path="/home-usage" component={HomeUsage} />
    <Route path="/join-rental" component={JoinRentalPage} />
    <Route path="/device" component={DevicePage} />
  </Route>
);

