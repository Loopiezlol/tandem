import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';
import SBChat from '../messaging/sbChat';

class sbUserList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = SBStore;
  }
  render() {
    const { userList } = this.state;
    const style = {
      width: '30pc',
      margin: 15,
      textAlign: 'center',
      display: 'inline-block',
    };
    const buttonStyle = {
      margin: 12,
    };
    return (
      <div className="wrapper-sb">

        <Paper style={style} zDepth={2}>
          <RaisedButton
            label="Refresh User List"
            onClick={() => SBActions.loadOnlineUsersList()}
            onTap={() => SBActions.loadOnlineUsersList()}
            primary style={buttonStyle}
          />
          <br />
          <List>
            {userList.map(user =>
              <ListItem
                key={`${user.user_id}`}
                primaryText={user.user_id}
                secondaryText={user.nickname}
                leftIcon={sbUserList.isOnlineIcon(user.is_online)}
                onClick={() => this.openChat(user.user_id, user.nickname)}
              />,
            )}
          </List>
        </Paper>

        <div className="chat">
          <SBChat />
        </div>

      </div>
    );
  }
  static isOnlineIcon(isOnline) {
    if (isOnline) {
      return <Avatar icon={<ChatIcon />} backgroundColor="#00bcd4" />;
    }
    return <Avatar icon={<ChatIcon />} backgroundColor="#bdbdbd" />;
  }
  openChat(userid, nick) {
    const { loggedIn, userID } = this.state;
    if (loggedIn && (userID === userid)) {
      alert("You can't chat with yourself!");
    } else {
      SBActions.openChat(userid, nick);
    }
  }
}

export default sbUserList;
