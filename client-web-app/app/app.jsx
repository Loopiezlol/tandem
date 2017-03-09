import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterComponent from './components/registerComponent';
import LoginComponent from './components/loginComponent';
import './styles/example.scss';
import './styles/example2.scss';
// import SBMessaging from './components/messaging/sbMessaging';
// import SampleComponent from './components/sampleComponent';
// import UsersList from './components/userList';

ReactDOM.render(
    // <MuiThemeProvider>
    //   <SBMessaging />
    // </MuiThemeProvider>
  <Router history={browserHistory}>
    <Route path="/" component={LoginComponent} />
    <Route path="/login" component={LoginComponent} />
    <Route path="/register" component={RegisterComponent} />
  </Router>
  , document.querySelector('.app'),
);
