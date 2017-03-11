import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
import './styles/example.scss';
import './styles/example2.scss';
import SBMessaging from './components/messaging/sbMessaging';
import UserCard from './components/discover-search-result';
import AuthHandler from './components/authHandler';

ReactDOM.render(
    // <MuiThemeProvider>
    //   <SBMessaging />
    // </MuiThemeProvider>
  <Router history={hashHistory}>
    <Route path="/" component={AuthHandler}>
      <Route path="/message" component={SBMessaging} />
      <Route path="/user" component={UserCard} />
    </Route>
    <Route path="/login" component={LoginComponent} />
    <Route path="/register" component={RegisterComponent} />
  </Router>
  , document.querySelector('.app'),
);
