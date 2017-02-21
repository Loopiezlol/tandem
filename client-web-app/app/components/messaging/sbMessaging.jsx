import React from 'react';
import Reflux from 'reflux';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';
import SBUserList from '../messaging/sbUserList';

class sbMessaging extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      sbUser: '',
      sbNick: '',
    };
    this.store = SBStore;
  }
  render() {
    const { sbUser, sbNick } = this.state;
    return (
      <div className="wrapper-sb">
        <h1>SendBird Chat Interface</h1>
        <p>Select a unique UserID and nickname:</p>
        <div>
          <input
            type="text" placeholder="UserID"
            value={sbUser} onChange={e => this.handleIDType(e)}
          />
          <input
            type="text" placeholder="Nickname"
            value={sbNick} onChange={e => this.handleNickType(e)}
          />
          <button onClick={() => this.handleCreate()}>Create SendBird User</button>
          <div>
            <p>Or, log in to an existing userID: </p>
            <input
              type="text" placeholder="Existing UserID"
              value={sbUser} onChange={e => this.handleEIDType(e)}
            />
            <button onClick={() => this.handleLogIn()}>Log in as SendBird User</button>
          </div>
          <SBUserList />
        </div>
      </div>
    );
  }
  handleCreate() {
    const { sbUser, sbNick } = this.state;
    if (!sbUser.length || !sbNick.length) {
      window.alert('Please insert an userID and nickname');
    } else {
      SBActions.createUser(sbUser, sbNick);
    }
  }
  handleLogIn() {
    const { sbUser } = this.state;
    if (!sbUser.length) {
      window.alert('Please insert an ID');
    } else {
      SBActions.loginUser(sbUser);
    }
  }
  handleIDType(e) {
    this.setState({
      sbUser: e.target.value,
    });
  }
  handleEIDType(e) {
    this.setState({
      sbUser: e.target.value,
    });
  }
  handleNickType(e) {
    this.setState({
      sbNick: e.target.value,
    });
  }
}

export default sbMessaging;
