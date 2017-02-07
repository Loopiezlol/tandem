import React from 'react';
import ReactDOM from 'react-dom';
import SampleComponent from './components/sampleComponent';
import UsersList from './components/userList';

ReactDOM.render(
  <div className="view">
    <SampleComponent />
    <UsersList />
  </div>
  , document.querySelector('.app'),
);
