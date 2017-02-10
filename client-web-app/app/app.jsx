import React from 'react';
import ReactDOM from 'react-dom';
import SampleComponent from './components/sampleComponent';
import UsersList from './components/userList';
import SBUserLogin from './components/messaging/sbUserLogin';

ReactDOM.render(
  <div className="view">
    <SampleComponent />
    <UsersList />
    <SBUserLogin />
  </div>
  , document.querySelector('.app'),
);
