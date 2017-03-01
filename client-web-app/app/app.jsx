import React from 'react';
import ReactDOM from 'react-dom';
import SearchResult from './components/discover-search-result';
// import SampleComponent from './components18ab29/sampleComponent';
// import UsersList from './components/userList';

import './styles/example.scss';
import './styles/example2.scss';

ReactDOM.render(
  <div className="view">
    {/* <SampleComponent />
    <UsersList /> */}
    <SearchResult />
  </div>, document.querySelector('.app'),
);
