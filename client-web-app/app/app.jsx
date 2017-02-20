import React from 'react';
import ReactDOM from 'react-dom';
import SampleComponent from './components/sampleComponent';
import UsersList from './components/userList';
import SBMessaging from './components/messaging/sbMessaging';

ReactDOM.render(
  <div className="view">
    <SampleComponent />
    <UsersList />
    <SBMessaging />
  </div>, document.querySelector('.app'),
);
