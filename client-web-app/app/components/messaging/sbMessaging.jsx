import React from 'react';
import Reflux from 'reflux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SBStore from '../../stores/sbStore';
import SBActions from '../../actions/sbActions';
import SBUserList from '../messaging/sbUserList';

class sbMessaging extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      sbUser: '',
      sbNick: '',
    };
    this.store = SBStore;
  }
  render() {
    const { sbUser, sbNick } = this.state;
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

        <AppBar
          title="Prototype Chat Interface"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />

        <Paper style={style} zDepth={2}>
          <p>Currently logged in as: </p>
          { this.logInCheck() }
        </Paper>

        <Paper style={style} zDepth={2}>
          <p>Select a unique User ID and nickname:</p>
          <TextField
            hintText="User ID"
            value={sbUser}
            onChange={e => this.handleIDType(e)}
          />
          <br />
          <TextField
            hintText="Nickname"
            value={sbNick}
            onChange={e => this.handleNickType(e)}
          />
          <br />
          <RaisedButton
            label="Create SendBird User"
            onClick={() => this.handleCreate()}
            onTap={() => this.handleCreate()}
            primary style={buttonStyle}
          />
        </Paper>

        <Paper style={style} zDepth={2}>
          <p>Or, log in to an existing user ID: </p>
          <TextField
            hintText="Existing User ID"
            value={sbUser}
            onChange={e => this.handleEIDType(e)}
          />
          <br />
          <RaisedButton
            label="Log in as SendBird User"
            onClick={() => this.handleLogIn()}
            onTap={() => this.handleLogIn()}
            primary style={buttonStyle}
          />
        </Paper>

        <SBUserList />

      </div>
    );
  }
  handleCreate() {
    const { sbUser, sbNick } = this.state;
    if (!sbUser.length || !sbNick.length) {
      window.alert('Please insert an userID and nickname');
    } else {
      SBActions.createUser(sbUser, sbNick);
    }
  }
  handleLogIn() {
    const { sbUser } = this.state;
    if (!sbUser.length) {
      window.alert('Please insert an ID');
    } else {
      SBActions.loginUser(sbUser);
    }
  }
  logInCheck() {
    const { loggedIn, userID, userNick } = this.state;
    if (loggedIn) {
      return <p style={{ fontWeight: 'bold' }}>{ userID } ({ userNick })</p>;
    }
    return <p style={{ color: '#00bcd4', fontWeight: 'bold' }}>Not logged in yet!</p>;
  }
  handleIDType(e) {
    this.setState({
      sbUser: e.target.value,
    });
  }
  handleEIDType(e) {
    this.setState({
      sbUser: e.target.value,
    });
  }
  handleNickType(e) {
    this.setState({
      sbNick: e.target.value,
    });
  }
}

export default sbMessaging;
