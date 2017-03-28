import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';

/* This class is holding the users component
who is online, and the users client to have match to
*/
class sbUserList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = SBStore;
    SBActions.loadOnlineUsersList();
  }
  render() {
    const { userList } = this.state;
    return (
      <div className="wrapper-sb">
        <Paper className="ULpaperStyle" zDepth={2}>
          <RaisedButton
            label="Refresh User List"
            onClick={() => SBActions.loadOnlineUsersList()}
            onTouchTap={() => SBActions.loadOnlineUsersList()}
            primary style={{ margin: 16 }}
          />
          <br />
          <Divider />
          <List>
            {userList.map(user =>
              <ListItem
                key={`${user.user_id}`}
                primaryText={user.user_id}
                secondaryText={user.nickname}
                rightIcon={sbUserList.isOnlineIcon(user.is_online)}
                leftAvatar={<Avatar src={`${user.profile_url}`} />}
                onClick={() => this.openChat(user.user_id, user.nickname)}
                onTouchTap={() => this.openChat(user.user_id, user.nickname)}
              />,
            )}
          </List>
        </Paper>
      </div>
    );
  }
  // The method to show who is online
  static isOnlineIcon(isOnline) {
    if (isOnline) {
      return <Avatar icon={<ChatIcon />} backgroundColor="#00bcd4" />;
    }
    return <Avatar icon={<ChatIcon />} backgroundColor="#bdbdbd" />;
  }
  // By clicking client redirect to chat sub component
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
