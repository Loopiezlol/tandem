import moment from 'moment';
import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactEmoji from 'react-emoji';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import SBStore from '../../stores/sbStore';
import '../../styles/sbChat.scss';
import SBActions from '../../actions/sbActions';

/* eslint-disable */
const reportIcon = <FontIcon className="material-icons">mood_bad</FontIcon>;
/* {const profileIcon = <FontIcon className="material-icons">account_circle</FontIcon>;}*/
const styles = {
  uploadButton: {
    verticalAlign: 'middle',
    width: '20%',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

// The component containing an actual conversation with a user

class chatComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fileMessage: '',
      abuseDialogOpen: false,
      usernameLabel: 'username-hidden',
    };
    this.store = SBStore;
  }

  handleAbuseOpen = () => {
    console.log('Opening block/report/abuse dialog.');
    this.setState({ abuseDialogOpen: true });
  };

  handleAbuseClose = () => {
    this.setState({ abuseDialogOpen: false });
  };

  showUserName(e) {
    console.log(e);
    if (this.state.usernameLabel === 'username-show') {
      this.setState({ usernameLabel: 'username-hidden' });
    } else {
      this.setState({ usernameLabel: 'username-show' });
    }
  }

  select = index => this.setState({ selectedIndex: index });

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onTouchTap={this.handleAbuseClose}
      />,
      <FlatButton
        label="Report"
        secondary
        onTouchTap={this.handleAbuseClose}
      />,
      <FlatButton
        label="Block"
        secondary
        onTouchTap={this.handleAbuseClose}
      />,
    ];
    const { otherUser, otherUserNick, message, prevMessages, messages, isTyping, otherUserProfileUrl, lastMessage }
     = this.state;
    let lastTimeStamp = 'New chat';
    if (!(lastMessage == null)) {
      lastTimeStamp = moment(lastMessage.createdAt).fromNow();
    }
    return (
      <div>
        <h3 style={{ margin: 14, fontSize: '0.93em', fontWeight: 'normal' }}>Chat with {otherUserNick} ({otherUser})</h3>
        <p>Last message: {lastTimeStamp}</p>
        <RaisedButton label="View Profile" style={{ margin: 12 }} icon={<Avatar src={otherUserProfileUrl} />} />
        <RaisedButton label="Block/Report" secondary style={{ margin: 12 }} icon={reportIcon} onClick={this.handleAbuseOpen} />
        <Dialog
          title="Block or Report this User"
          actions={actions}
          modal={false}
          open={this.state.abuseDialogOpen}
          onRequestClose={this.handleAbuseClose}
        >
          We&apos;re sorry you&apos;ve experienced a negative interaction with another user.
          We take abuse on our platform seriously, and have a number of options available for you:
          Blocking this user permanently removes their ability to contact you through this app.
          For more serious abuse, please submit a report to us, and we&apos;ll aim to
          take appropriate action quickly.
        </Dialog>
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

        <div className="input" style={{ paddingBottom: '20px' }}>
          <TextField
            floatingLabelText="Type Your Message"
            value={message} onChange={e => this.handleMessageType(e)}
          />
          <FlatButton
            icon={<i className="material-icons">attachment</i>}
            onclick={e => this._handleChange(e)}
            onchange={e => this._openFileDialog(e)}
          >
            <input type="file" style={styles.uploadInput}  />
          </FlatButton>
          <RaisedButton
            primary style={{ margin: 5 }}
            label="Send"
            onClick={e => this.handleSendButton(e)}
            onTap={e => this.handleSendButton(e)}
          />
        </div>
      </div>
    );
  }

  handleChange(e) {
    console.log(e.target.value);
  }
  _openFileDialog() {
    const fileUploadDom = this.node(this.refs.fileUpload);
    fileUploadDom.click();
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

  openAbuseComponent() {
    // TODO!
  }

  renderMessage(message) {
    const timeStamp = moment(message.createdAt).fromNow();
    if (message.sender.userId === this.store.state.userID) {
      return (
        <div>
          <p className="usernameLabel" style={{ paddingLeft: '340px' }} id={this.state.usernameLabel}> {message.sender.nickname}{timeStamp} </p>
          <div onClick={e => this.showUserName(e)} className="message to">
            {ReactEmoji.emojify(message.message) || message.message}
          </div>
        </div>
      );
    }

    return (
      <div>
        <p className="usernameLabel" style={{ paddingRight: '360px' }} id={this.state.usernameLabel}> {message.sender.nickname}{timeStamp} </p>
        <div onClick={e => this.showUserName(e)} className="message from">
          {ReactEmoji.emojify(message.message) || message.message}
        </div>
      </div>
    );
  }
}


export default chatComponent;
