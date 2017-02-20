import Reflux from 'reflux';
import SendBird from 'sendbird';
import request from 'superagent';
import sbactions from '../actions/sbActions';

const APP_ID = '78A3DDF9-3396-4088-95C3-A5E8CBDF9AD3';
const API_TOKEN = 'ff8bf5060352c01ce575287f25def5be4b02fd6d';
const sb = new SendBird({ appId: APP_ID });

class sbStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      userID: '',
      userNick: '',
      profileURL: '', // TODO: Implement!
      messagesRec: [], // TODO: Implement!
      messagesSen: [], // TODO: Implement!
      latestUserList: {}, // TODO: Implement!
      channelCreated: {},
    };
    this.listenables = sbactions;
  }

  createUserCompleted(res) {
    if (res.status === 200) {
      console.log('SendBird User Creation: Server response 200');
      this.setState({
        userID: res.body.user_id,
        userNick: res.body.nickname,
        profileURL: res.body.profile_url,
      });
      sb.connect(res.body.user_id, (user, error) => {
        if (error) {
          console.log(`SendBird Connection error: ${error}`);
        } else {
          console.log(`SendBird should be connected! User is: ${this.state.userID}`);
        }
      });
    } else {
      console.log(`SendBird User Creation ERROR:
      Server response ${res.status} ${res.statusText}`);
    }
  }

  static createUserFailed(err) {
    console.log(`SendBird User Creation ERROR. ERROR: ${err}`);
  }

  loadOnlineUsersListComplete(res) {
    if (res.status === 200) {
      console.log('SendBird User List GET: Server response 200 (OK)');
      this.setState({ latestUserList: res });
    } else {
      console.log(`SendBird User List GET ERROR:
      Server response ${res.status} ${res.statusText}`);
    }
  }

  static loadOnlineUsersListFailed(err) {
    console.log(`SendBird User List GET ERROR. ERROR: ${err}`);
  }

  createChannelCompleted(res) {
    if (res.status === 200) {
      console.log('SendBird Channel Creation: Server response 200 (OK)');
      this.setState({ channelCreated: res });
    } else {
      console.log(`SendBird Channel Creation ERROR:
      Server response ${res.status} ${res.statusText}`);
    }
  }

  static createChannelFailed(err) {
    console.log(`SendBird Channel Creation ERROR. ERROR: ${err}`);
  }

  sendMessageCompleted(res) {
    if (res.status === 200) {
      console.log('SendBird Message Sent: Server response 200 (OK)');
      this.state.messagesSen.push(res);
    } else {
      console.log(`SendBird Message Send ERROR:
      Server response ${res.status} ${res.statusText}`);
    }
  }

  static sendMessageFailed(err) {
    console.log(`SendBird Message Sending ERROR. ERROR: ${err}`);
  }
}

sbactions.createUser.listen((userid, nick) => {
  request.post('https://api.sendbird.com/v3/users')
    .set('Content-Type', 'application/json', 'charset=utf8')
    .set('Api-Token', API_TOKEN)
    .send({
      user_id: userid,
      nickname: nick,
      profile_url: '',
    })
    .end((err, res) => {
      if (err || !res.ok) {
        console.log(`Error creating SendBird User: ${JSON.stringify(err)}`);
        sbactions.createUser.failed(err);
      } else {
        console.log(`SendBird user creation done: ${JSON.stringify(res.body)}`);
        sbactions.createUser.completed(res);
      }
    });
});

sbactions.loadOnlineUsersList.listen(() => {
  request.get('https://api.sendbird.com/v3/users?limit=10')
    .end((err, res) => {
      if (err || !res.ok) {
        console.log(`Error getting user list: ${JSON.stringify(err)}`);
        sbactions.loadOnlineUsersList.failed(err);
      } else {
        console.log(`User list GET success: ${JSON.stringify(res.body)}`);
        sbactions.loadOnlineUsersList.completed(res);
      }
    });
});

sbactions.createChannel.listen((userID, otherUserID) => {
  request.get('https://api.sendbird.com/v3/group_channels')
    .set('Content-Type', 'application/json', 'charset=utf8')
    .set('Api-Token', API_TOKEN)
    .send({
      name: `Chat with ${otherUserID}`,
      cover_url: 'https://sendbird.com/main/img/cover/cover_08.jpg',
      custom_type: 'personal',
      data: '',
      user_ids: [userID, otherUserID],
      is_distinct: true,
    })
    .end((err, res) => {
      if (err || !res.ok) {
        console.log(`Error creating 1-1 channel: ${JSON.stringify(err)}`);
        sbactions.createChannel.failed(err);
      } else {
        console.log(`1-1 channel creation success: ${JSON.stringify(res.body)}`);
        sbactions.createChannel.completed(res);
      }
    });
});

sbactions.sendMessage.listen((channelType, channelUrl, userID, message) => {
  request.post(`https://api.sendbird.com/v3/${channelType}/${channelUrl}/messages`)
    .set('Content-Type', 'application/json', 'charset=utf8')
    .set('Api-Token', API_TOKEN)
    .send({
      message_type: 'MESG',
      user_id: userID,
      message,
    })
    .end((err, res) => {
      if (err || !res.ok) {
        console.log(`Error sending SendBird message: ${JSON.stringify(err)}`);
        sbactions.sendMessage.failed(err);
      } else {
        console.log(`SendBird message sent: ${JSON.stringify(res.body)}`);
        sbactions.sendMessage.completed(res);
      }
    });
});

export default sbStore;
