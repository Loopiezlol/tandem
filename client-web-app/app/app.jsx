import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
import './styles/example.scss';
import './styles/example2.scss';
import SBMessaging from './components/messaging/sbMessaging';
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
    <Route path="/message" component={SBMessaging} />
  </Router>
  , document.querySelector('.app'),
);
