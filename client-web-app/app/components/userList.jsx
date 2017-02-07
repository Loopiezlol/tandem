import React from 'react';
import Reflux from 'reflux';
import SampleStore from '../stores/sampleStore';
import actions from '../actions';

class UsersList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: '',
    };
    this.store = SampleStore;
  }
  render() {
    const { users, newUser } = this.state;
    return (
      <div className="users-wrapper">
        <p>Users:</p>
        <ul className="user-list">
          {users.map(user => <li key={`${user.username}`}>{user.username}</li>)}
        </ul>
        <div className="input">
          <button onClick={() => actions.getUsers()}>Get Users</button>
          <button onClick={() => this.handleCreate()}>Create User</button>
          <input type="text" value={newUser} onChange={e => this.handleType(e)} />
        </div>
      </div>
    );
  }

  handleCreate() {
    const { newUser } = this.state;
    if (!newUser.length) {
      window.alert('Please insert an username');
    } else {
      actions.createUser(newUser);
    }
  }

  handleType(e) {
    this.setState({
      newUser: e.target.value,
    });
  }
}

export default UsersList;
