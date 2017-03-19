import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ReactEmoji from 'react-emoji';
import Divider from 'material-ui/Divider';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';
import '../../styles/sbChat.scss';
/* eslint-disable*/

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      usernameLabel: 'username-hidden',
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
          <Paper className="paperStyle" zDepth={1} >
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
              <Paper className="textFieldStyle">
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
    console.log(currentChannel.isTyping());
    if (e.target.value && e.target.value.length) {
      currentChannel.startTyping();
    } else {
      currentChannel.endTyping();
    }
    this.setState({
      message: e.target.value,
    });
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

  renderMessage(message) {
    if (message.sender.userId === this.store.state.userID) {
      return (
        <div>
          <p className="usernameLabel" style={{ paddingLeft: '340px' }} id={this.state.usernameLabel}> {message.sender.nickname} </p>
          <div onClick={e => this.showUserName(e)} className="message to">
            {ReactEmoji.emojify(message.message) || message.message}
          </div>
        </div>
      );
    }
    return (
      <div>
        <p className="usernameLabel" style={{ paddingRight: '360px' }} id={this.state.usernameLabel}> {message.sender.nickname} </p>
        <div onClick={e => this.showUserName(e)} className="message from">
          {ReactEmoji.emojify(message.message) || message.message}
        </div>
      </div>
    );
  }
}


export default sbChat;
