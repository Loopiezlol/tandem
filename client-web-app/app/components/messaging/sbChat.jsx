import React from 'react';
import Reflux from 'reflux';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = SBStore;
  }
  render() {
    const { chatOpen, otherUser, otherUserNick } = this.state;
    if (chatOpen) {
      return (
        <div className="wrapper-sb">
          <h2>SendBird Chat with {otherUserNick} ({otherUser})</h2>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default sbChat;
