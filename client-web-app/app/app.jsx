import React from 'react';
import ReactDOM from 'react-dom';
import PaneControl from './components/PaneControl';

import { Router, Route, hashHistory } from 'react-router';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
import './styles/example.scss';
import './styles/example2.scss';
import SBMessaging from './components/messaging/messaging';
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
  <div className="view">
    <PaneControl />
  </div>

// ReactDOM.render(
//   <Router history={hashHistory}>
//     <Route path="/" component={AuthHandler}>
//       <Route path="/message" component={SBMessaging} />
//       <Route path="/user" component={UserCard} />
//     </Route>
//     <Route path="/login" component={LoginComponent} onEnded={redirectIfLoggedIn} />
//     <Route path="/register" component={RegisterComponent} onEnter={redirectIfLoggedIn} />
//   </Router>
// >>>>>>> origin/develop
  , document.querySelector('.app'),
);

// please note how at unprotected routes I've added the onEnter check.
// basically if you're already logged in it'll redirect you to /
