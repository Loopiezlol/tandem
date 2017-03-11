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
import actions from './actions';

function redirectIfLoggedIn() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    actions.meFromToken(jwt);
    hashHistory.push('/');
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AuthHandler}>
      <Route path="/message" component={SBMessaging} />
      <Route path="/user" component={UserCard} />
    </Route>
    <Route path="/login" component={LoginComponent} onEnded={redirectIfLoggedIn} />
    <Route path="/register" component={RegisterComponent} onEnter={redirectIfLoggedIn} />
  </Router>
  , document.querySelector('.app'),
);
