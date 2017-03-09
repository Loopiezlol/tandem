import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
import Onboarding from './components/Onboarding';
import './styles/example.scss';

import './styles/example2.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LoginComponent} />
    <Route path="/login" component={LoginComponent} />
    <Route path="/register" component={RegisterComponent} />
    <Route path="/onboarding" component={Onboarding} />
  </Router>
  , document.querySelector('.app'),
);
