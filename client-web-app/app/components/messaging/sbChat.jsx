import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import ReactEmoji from 'react-emoji';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';
import '../../styles/sbChat.scss';
/* eslint-disable*/

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      hello: true,
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

    const style = {
      width: '30pc',
      margin: 15,
      textAlign: 'center',
      display:'inline-block',
      color: 'gray',
      transitionEnabled: false
    };
    const styleMessage = {
     width: '30pc',
     margin: 0,
     textAlign: 'center',
     display: 'inline-block',
     color: 'black',
    };
    const styleMessage2 = {
     width: '25pc',
     margin: 0,
     textAlign: 'center',
     display: 'inline-block',
     color: 'black',
    };

    if (chatOpen) {
      return (
        <div>
          <Paper style={style} zDepth={1} >
            <h5>SendBird Chat with {otherUserNick} ({otherUser})</h5>

            <div>
               <Paper style={styleMessage} zDepth={0}>
              <div className="messages">
                <ul className="old-messages" style={{ listStyle: 'none' }}>
                  {prevMessages.map(msg => <li key={`${msg.messageId}`}>
                    {this.renderMessage(msg)}
                  </li>)}
                </ul>

              </div>
              <Paper style={styleMessage2}>
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
    const { currentChannel } = this.state;
    currentChannel.endTyping();
    SBActions.sendMessage(this.state.message);
    this.setState({
      message: '',
    });
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
