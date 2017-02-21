import React from 'react';
import ReactDOM from 'react-dom';
import SampleComponent from './components/sampleComponent';
import UsersList from './components/userList';
import LoginComponent from './components/loginComponent';

ReactDOM.render(
  <div className="view">
    <SampleComponent />
    <UsersList />
    <LoginComponent />
  </div>
  , document.querySelector('.app'),
);
