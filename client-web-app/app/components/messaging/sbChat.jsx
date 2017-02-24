import React from 'react';
import Reflux from 'reflux';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.store = SBStore;
  }
  render() {
    const { chatOpen, otherUser, otherUserNick, message, prevMessages, messages } = this.state;
    if (chatOpen) {
      return (
        <div className="wrapper-sb">
          <h2>SendBird Chat with {otherUserNick} ({otherUser})</h2>
          <h3>Messages</h3>
          <div className="messages">

            <ul className="old-messages">
              {prevMessages.map(message => <li key={`${message.messageId}`}>
                {message.sender.nickname}: {message.message}
              </li>)}
            </ul>

          </div>
          <div className="currentMsg">

              <ul className="new-messages">
                {messages.map(message => <li key={`${message.messageId}`}>
                  {message.sender.nickname}: {message.message}
                </li>)}
              </ul>

          </div>
          <div className="input">
            <input
              type="text" placeholder="Message"
              value={message} onChange={e => this.handleMessageType(e)}
            />
            <button onClick={() => SBActions.sendMessage(this.state.message)}>Send!</button>
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
}

export default sbChat;
