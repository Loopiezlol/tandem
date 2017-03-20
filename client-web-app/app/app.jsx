import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Router, Route, hashHistory } from 'react-router';
import PaneControl from './components/PaneControl';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
// import Onboarding from './components/Onboarding/Onboarding';
// import './styles/example.scss';
// import './styles/example2.scss';
import './styles/main.scss';
// import SBMessaging from './components/messaging/messaging';
// import UserCard from './components/discover-search-result';
// import User from './components/UserProfile/User';
import AuthHandler from './components/authHandler';
import actions from './actions/actions';
//eslint-disable-next-line
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

function redirectIfLoggedIn() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    actions.meFromToken(jwt);
    hashHistory.push('/');
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AuthHandler} >
      <Route path="/home" component={PaneControl} />
      {/* <Route path="/onboarding" component={Onboarding} />
      <Route path="/message" component={SBMessaging} />
      <Route path="/user" component={UserCard} />
      <Route path="/myProfile" component={User} /> */}
    </Route>
    <Route path="/login" component={LoginComponent} onEnded={redirectIfLoggedIn} />
    <Route path="/register" component={RegisterComponent} onEnter={redirectIfLoggedIn} />
  </Router>
  , document.querySelector('.app'),
);

// please note how at unprotected routes I've added the onEnter check.
// basically if you're already logged in it'll redirect you to /
