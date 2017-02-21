import React from 'react';
import Reflux from 'reflux';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';

// TODO:
// 1) Check if a channel with the other user already exists.
// 2) If YES, JOIN and load previous messages.
// 2) If NO, create the new channel and event handlers and JOIN.

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.store = SBStore;
  }
  render() {
    const { chatOpen, otherUser, otherUserNick, message } = this.state;
    if (chatOpen) {
      return (
        <div className="wrapper-sb">
          <h2>SendBird Chat with {otherUserNick} ({otherUser})</h2>
          <div className="messages">
            <p>placeholder message</p>
          </div>
          <div className="input">
            <input
              type="text" placeholder="Message"
              value={message} onChange={e => this.handleMessageType(e)}
            />
            <button onClick={() => this.handleSend()}>Send!</button>
          </div>
        </div>
      );
    }
    return null;
  }
  handleMessageType(e) {
    this.setState({
      message: e.target.value,
    });
  }
  handleSend() {
    this.setState({
    });
    SBActions.sendMessage();
    // TODO: Implement!
  }
}

export default sbChat;
