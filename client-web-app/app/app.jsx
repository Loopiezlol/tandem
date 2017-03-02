import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
import './styles/example.scss';

import './styles/example2.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LoginComponent} />
    <Route path="/login" component={LoginComponent} />
    <Route path="/register" component={RegisterComponent} />
  </Router>
  , document.querySelector('.app'),
);
