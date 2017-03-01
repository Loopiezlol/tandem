import React from 'react';
import ReactDOM from 'react-dom';
import SampleComponent from './components/sampleComponent';
import UsersList from './components/userList';
import RegisterComponent from './components/registerComponent';
import LoginComponent from  './components/loginComponent';
import './styles/example.scss';
import './styles/example2.scss';

ReactDOM.render(
  <div className="view">
    <div>
    <RegisterComponent />
    </div>
    <div>
    <LoginComponent />
  </div>

  </div>
  , document.querySelector('.app'),
);
