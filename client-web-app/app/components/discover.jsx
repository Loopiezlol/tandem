import React from 'react';
import Reflux from 'reflux';
import SampleStore from '../stores/sampleStore';
import actions from '../actions';

const divStyle = {
  background: 'blue',
};

function SampleFilter() {
  const filterStyle = {
    height: '200px',
    background: 'green',
    boxShadow: '0px 7px 9px',
    position: 'relative',
  };
  return (
    <div className="control-discover-filterbar" style={filterStyle}>
      <button onClick={() => actions.getUsers()}>Search!</button>
    </div>
  );
}

class Discover extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.store = SampleStore;
  }

  render() {
    const { users } = this.state;
    return (
      <div style={divStyle}>
        <SampleFilter />
        <div style={{ height: 'calc(100vh - 232px)', position: 'relative' }}>
          <ul>
            {users.map(user => <li key={`${user.username}`}>{user.username}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Discover;
