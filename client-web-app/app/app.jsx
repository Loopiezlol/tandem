import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SampleComponent from './components/sampleComponent';
import UsersList from './components/userList';
import SBMessaging from './components/messaging/sbMessaging';

ReactDOM.render(
  <div className="view">
    {/* }<SampleComponent />
  <UsersList /> */}
    <MuiThemeProvider>
      <SBMessaging />
    </MuiThemeProvider>
  </div>, document.querySelector('.app'),
);
