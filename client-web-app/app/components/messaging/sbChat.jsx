import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      hello: true,
    };
    this.store = SBStore;
  }


  render() {
    const { chatOpen, otherUser, otherUserNick, message, prevMessages, messages, isTyping }
     = this.state;

    if (isTyping) {
      // console.log('user is typing');
    }
    const style = {
      width: '30pc',
      margin: 15,
      textAlign: 'center',
      display: 'inline-block',
      color: 'blue',
    };
    const styleMessage = {
      width: '20pc',
      margin: 6,
      textAlign: 'center',
      display: 'inline-block',
      color: 'black',
    };
    const buttonStyle = {
      margin: 5,
    };
    if (chatOpen) {
      return (
        <div className="wrapper-sb">
          <Paper style={style} zDepth={2}>
            <h2>SendBird Chat with {otherUserNick} ({otherUser})</h2>
            <h3>Messages</h3>

            <Paper style={styleMessage}>
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
            </Paper>

            { isTyping ? <div>typing...</div> : <div />}

            <div className="input">
              <TextField
                floatingLabelText="Type Your Message"
                value={message} onChange={e => this.handleMessageType(e)}
              />
              <FlatButton
                label="Send"
                onClick={e => this.handleSendButton(e)}
                onTap={e => this.handleSendButton(e)}
                primary style={buttonStyle}
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
}


export default sbChat;
