import moment from 'moment';
import Infinite from 'react-infinite';
import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ReactEmoji from 'react-emoji';
import ChatComponent from '../messaging/chatComponent';
import MeetingComponent from '../messaging/meetingComponent';
import LibBookComponent from '../messaging/libBookingComponent';
import SBStore from '../../stores/sbStore';
import '../../styles/sbChat.scss';
import SBActions from '../../actions/sbActions';
// /* eslint-disable*/

const messageIcon = <FontIcon className="material-icons">message</FontIcon>;
const meetIcon = <FontIcon className="material-icons">people</FontIcon>;
const nearbyIcon = <IconLocationOn />;

class sbChat extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      selectedIndex: 0,
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

  select = (index) => {
    this.setState({ selectedIndex: index }, () => {
      console.log(`Chat index selected: ${this.state.selectedIndex}`);
    });
  }

  render() {
    const { chatOpen } = this.state;

    if (chatOpen) {
      return (
        <div>
          <Paper className="paperStyle" zDepth={2} >
            <Paper style={{ overflow: 'scroll', height: '45pc' }}>
              {(this.state.selectedIndex === 0) && <ChatComponent /> }
              {(this.state.selectedIndex === 1) && <MeetingComponent /> }
              {(this.state.selectedIndex === 2) && <LibBookComponent /> }
            </Paper>

            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Messages"
                icon={messageIcon}
                onTouchTap={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Start a Meeting"
                icon={meetIcon}
                onTouchTap={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Book a Room"
                icon={nearbyIcon}
                onTouchTap={() => this.select(2)}
              />
            </BottomNavigation>
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

  // renderProfileImage() {
  //   const { currentChannel, otherUserProfileUrl } = this.state;
  //
  //   //  </paper>
  //   );
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
            {ReactEmoji.emojify(message.message) || message.message }
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
