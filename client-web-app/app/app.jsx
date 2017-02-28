import React from 'react';
import ReactDOM from 'react-dom';
// import SampleComponent from './components/sampleComponent';
// import UsersList from './components/userList';
import Discover from './components/discover';

import './styles/example.scss';
import './styles/example2.scss';
import './styles/discover.scss';

ReactDOM.render(
  <div className="view">
    <Discover />
  </div>, document.querySelector('.app'),
);
