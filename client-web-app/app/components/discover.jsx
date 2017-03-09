import React from 'react';
import Reflux from 'reflux';
import SampleStore from '../stores/sampleStore';
import actions from '../actions';

class Discover extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      boxContent: 0,
    };
    this.store = SampleStore;
  }

  render() {
    const { users, searchText, boxContent } = this.state;
    return (
      <div className="control-discover">
        <div className="control-discover-filter">
          <input type="text" value={searchText} onChange={e => this.handleType(e)} />
          <input type="checkbox" checked={boxContent} onChange={e => this.handleBox(e)} />
          <button onClick={() => actions.getUsers()}>Search!</button>
        </div>
        <div className="control-discover-results">
          <ul>
            {users.map(user => <li key={`${user.username}`}>{user.username}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  handleType(e) {
    this.setState({
      searchText: e.target.value,
    });
    console.log(this.state.searchText);
  }
  handleBox(e) {
    console.log(e);
    this.setState({
      boxContent: e.target.checked,
    }, console.log(this.state.boxContent));
  }
}

export default Discover;
