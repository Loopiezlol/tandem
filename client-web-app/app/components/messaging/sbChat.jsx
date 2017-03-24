import moment from 'moment';
import Infinite from 'react-infinite';
import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ReactEmoji from 'react-emoji';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import SBStore from '../../stores/sbStore';
import '../../styles/sbChat.scss';
import SBActions from '../../actions/sbActions';
// /* eslint-disable*/

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      usernameLabel: 'username-hidden',
      //newMessages: [],
    };
    this.store = SBStore;
  }


  showUserName(e) {
    console.log(e);
    if (this.state.usernameLabel === 'username-show') {
      this.setState({ usernameLabel: 'username-hidden' });
    } else {
      this.setState({ usernameLabel: 'username-show' });
    }
  }


  render() {
    const { chatOpen, otherUser, otherUserNick, message, prevMessages, messages, isTyping }
     = this.state;


    if (chatOpen) {
      return (
        <div>
          <Paper className="paperStyle" zDepth={2} >
            <h5>Chat with {otherUserNick} ({otherUser})</h5>
            <Divider />
            <div>
              <Paper className="messageStyle" zDepth={0}>
                <div className="messages">
                  <ul className="old-messages" style={{ listStyle: 'none' }}>
                    {prevMessages.map(msg => <li key={`${msg.messageId}`}>
                      {this.renderMessage(msg)}
                    </li>)}
                  </ul>

                </div>
                <Paper className="textFieldStyle" zDepth={0}>
                  <span className="messageDividerLine" id="divider-left" />
                  <p id="messageDividerLabel">New messages</p>
                  <span className="messageDividerLine" id="divider-right" />
                </Paper>
                <div className="currentMsg">
                  <ul className="new-messages" style={{ listStyle: 'none' }}>
                    {messages.map(msg => <li key={`${msg.messageId}`}>
                      {this.renderMessage(msg)}
                    </li>)}
                  </ul>
                </div>

              </Paper>
            </div>
            { isTyping ? <div>typing...</div> : <div />}

            <div className="input">
              <TextField
                floatingLabelText="Type Your Message"
                value={message} onChange={e => this.handleMessageType(e)}
                onKeyPress={e => this.handleMessageType(e)}
              />
              <FlatButton
                primary style={{ margin: 5 }}
                label="Send"
                onClick={e => this.handleSendButton(e)}
                onTap={e => this.handleSendButton(e)}
              />
            </div>
          </Paper>

        </div>
      );
    }
    return null;
  }

  handleMessageType(e) {
    const { currentChannel } = this.state;
    if (e.target.value && e.target.value.length) {
      currentChannel.startTyping();
    } else {
      currentChannel.endTyping();
    }
    this.setState({
      message: e.target.value,
    });
    if (e.key === 'Enter') {
      this.handleSendButton(e);
    }
  }

  handleSendButton() {
    if (this.state.message) {
      const { currentChannel } = this.state;
      currentChannel.endTyping();
      SBActions.sendMessage(this.state.message);
      this.setState({
        message: '',
      });
    }
  }

  // showPreviousMessages() {
  //   const { newMessages, unreadMessages, prevMessages } = this.state;
  //   if (unreadMessages > 0) {
  //     this.setState({
  //       newMessages: {},
  //     });
  //     for (let i = prevMessages.length - 1; i > prevMessages.length - 1 - unreadMessages; i++) {
  //       newMessages[i].push(prevMessages[i]);
  //       prevMessages.splice(i, 1);
  //     }
  //   }
  //   return (
  //     <div className="messages">
  //       <ul className="old-messages" style={{ listStyle: 'none' }}>
  //         {prevMessages.map(msg => <li key={`${msg.messageId}`}>
  //           {this.renderMessage(msg, Avatar)}
  //         </li>)}
  //       </ul>
  //
  //     </div>
  //   );
  // }
  // showNewMessages() {
  //   const { messages, newMessages } = this.state;
  //   if (newMessages) {
  //     return (
  //       <div>
  //         <Paper className="textFieldStyle" zDepth={0}>
  //           <span className="messageDividerLine" id="divider-left" />
  //           <p id="messageDividerLabel">New messages</p>
  //           <span className="messageDividerLine" id="divider-right" />
  //         </Paper>
  //         <div>
  //           <ul className="new-messages" style={{ listStyle: 'none' }}>
  //             {newMessages.map(msg => <li key={`${msg.messageId}`}>
  //               {this.renderMessage(msg, Avatar)}
  //             </li>)}
  //           </ul>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  renderMessage(message) {
    const timeStamp = moment(message.createdAt).fromNow();
    if (message.sender.userId === this.store.state.userID) {
      return (
        <div>
          <p className="usernameLabel" style={{ paddingLeft: '340px' }} id={this.state.usernameLabel}> {message.sender.nickname}
            <span className="timeStampLabel">{timeStamp}</span>
          </p>
          <paper className="avatarStyle">
            <Avatar className="avatarTo" src={`${message._sender.profileUrl}`} />
          </paper>
          <div onClick={e => this.showUserName(e)} className="message to">
            {ReactEmoji.emojify(message.message) || message.message || Avatar}
          </div>
        </div>
      );
    }

    return (
      <div>
        <p className="usernameLabel" style={{ paddingRight: '360px' }} id={this.state.usernameLabel}> {message.sender.nickname}
          <span className="timeStampLabel" style={{ paddingLeft: '12px' }}>{timeStamp}</span>
        </p>
        <paper className="avatarStyle">
          <Avatar className="avatarFrom" src={`${message._sender.profileUrl}`} />
        </paper>
        <div onClick={e => this.showUserName(e)} className="message from">
          {ReactEmoji.emojify(message.message) || message.message}
        </div>
      </div>
    );
  }
}


export default sbChat;
