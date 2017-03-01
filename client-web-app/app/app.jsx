import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import SampleComponent from './components/sampleComponent';
import UsersList from './components/userList';
import RegisterComponent from './components/registerComponent';
import LoginComponent from  './components/loginComponent';
import './styles/example.scss';

ReactDOM.render(
  <Router history={browserHistory}>
  <Route path="/" component={LoginComponent}>
  </Route>
  <Route path="/login" component={LoginComponent}>
  </Route>
  <Route path="/register" component={RegisterComponent}>
  </Route>
  </Router>
  , document.querySelector('.app'),
);
