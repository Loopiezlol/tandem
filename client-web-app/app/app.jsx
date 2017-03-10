import React from 'react';
import ReactDOM from 'react-dom';
// import SampleComponent from './components/sampleComponent';
// import UsersList from './components/userList';
import Discover from './components/discover';

import './styles/example.scss';
import './styles/example2.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

console.log('sfdggfsg');

ReactDOM.render(
  <div className="view">
    <Discover />
  </div>, document.querySelector('.app'),
);
