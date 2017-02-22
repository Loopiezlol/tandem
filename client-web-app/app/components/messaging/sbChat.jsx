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
    const { chatOpen, otherUser, otherUserNick, message, prevMessages, messages } = this.state;
    if (chatOpen) {
      return (
        <div className="wrapper-sb">
          <h2>SendBird Chat with {otherUserNick} ({otherUser})</h2>
          <h3>Messages</h3>
          <div className="messages">

            <ul style={{textColor: "GRAY"}} className="old-messages">
              {prevMessages.map(message => <li key={`${message.message_id}`}>
                {message.sender.nickname}: {message.message}
              </li>)}
            </ul>

          </div>
          <div className="currentMsg">

              <ul className="new-messages">
                {messages.map(message => <li key={`${message.message_id}`}>
                  {message.user.nickname}: {message.message}
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

// TODO: Show previous messages from prevMessages!!!
// <div className="messages">
//
//   <ul className="old-messages">
//     {prevMessages.map(message => <li key={`${user.user_id}`}>
//       ID: {user.user_id}
//       <ul>
//         <li>Nickname: {user.nickname}</li>
//         <li>is_Online: {JSON.stringify(user.is_online)}</li>
//         <li><button onClick={() => SBActions.openChat(user.user_id, user.nickname)}>
//           Chat!</button></li>
//       </ul>
//     </li>)}
//   </ul>
//
// </div>

export default sbChat;
