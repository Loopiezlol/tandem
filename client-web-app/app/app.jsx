import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Router, Route, hashHistory } from 'react-router';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
import Onboarding from './components/Onboarding';
import './styles/example.scss';
import './styles/example2.scss';
import SBMessaging from './components/messaging/sbMessaging';
import UserCard from './components/discover-search-result';
// import SampleComponent from './components/sampleComponent';
// import UsersList from './components/userList';

ReactDOM.render(
    // <MuiThemeProvider>
    //   <SBMessaging />
    // </MuiThemeProvider>
  <Router history={hashHistory}>
    <Route path="/" component={LoginComponent} />
    <Route path="/login" component={LoginComponent} />
    <Route path="/register" component={RegisterComponent} />
    <Route path="/onboarding" component={Onboarding} />
    <Route path="/message" component={SBMessaging} />
    <Route path="/user" component={UserCard} />
  </Router>
  , document.querySelector('.app'),
);
