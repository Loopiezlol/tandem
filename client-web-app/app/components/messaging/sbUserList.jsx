import React from 'react';
import Reflux from 'reflux';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';
import SBChat from '../messaging/sbChat';

class sbUserList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = SBStore;
  }
  render() {
    const { userList } = this.state;
    return (
      <div className="wrapper-sb">
        <h2>SendBird User List</h2>
        <p>N/B: currently imited to 10 users.</p>
        <ul className="sbuser-list">
          {userList.map(user => <li key={`${user.user_id}`}>
            ID: {user.user_id}
            <ul>
              <li>Nickname: {user.nickname}</li>
              <li>is_Online: {JSON.stringify(user.is_online)}</li>
              <li><button onClick={() => SBActions.openChat(user.user_id, user.nickname)}>
                Chat!</button></li>
            </ul>
          </li>)}
        </ul>
        <div className="btn">
          <button onClick={() => SBActions.loadOnlineUsersList()}>Get Users</button>
        </div>
        <div className="chat">
          <SBChat />
        </div>
      </div>
    );
  }
}

// ID: {user.user_id},
// Nickname: {user.nickname},
// is_Online: {JSON.stringify(user.is_online)} ,
// <button onClick={() => SBActions.openChat(user.user_id, user.nickname)}>Chat!</button>

export default sbUserList;
