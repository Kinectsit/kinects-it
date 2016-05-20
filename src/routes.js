import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './components/App';
import { Home } from './components/Home';
import Demo from './containers/Demo';
import LoginPage from './containers/LoginPage';
import { SignupPage } from './components/SignupPage';
import DashboardPage from './containers/DashboardPage';
import UsageStatsPage from './containers/UsageStatsPage';
import AddDevicePage from './containers/AddDevicePage';
import SetupDevicePage from './containers/SetupDevicePage';
import DeviceProfilePage from './containers/DeviceProfilePage';
import HomeUsage from './components/HomeUsage';
import JoinRentalPage from './containers/JoinRentalPage';
import ChooseRolePage from './containers/ChooseRolePage';
import DevicePage from './containers/DevicePage';
import Logout from './components/Logout';
import { requireAuthentication } from './containers/requireAuthentication';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/demo" component={Demo} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/dashboard" component={requireAuthentication(DashboardPage)} />
    <Route path="/add-device" component={requireAuthentication(AddDevicePage)} />
    <Route path="/usage-stats" component={requireAuthentication(UsageStatsPage)} />
    <Route path="/setup-device" component={requireAuthentication(SetupDevicePage)} />
    <Route path="/device-profile" component={requireAuthentication(DeviceProfilePage)} />
    <Route path="/home-usage" component={requireAuthentication(HomeUsage)} />
    <Route path="/join-rental" component={requireAuthentication(JoinRentalPage)} />
    <Route path="/device" component={requireAuthentication(DevicePage)} />
    <Route path="/choose-role" component={requireAuthentication(ChooseRolePage)} />
    <Route path="/logout" component={requireAuthentication(Logout)} />
    <Route path="*" component={requireAuthentication(DashboardPage)} />
  </Route>
);
