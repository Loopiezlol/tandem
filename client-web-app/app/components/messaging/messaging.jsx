import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import ReactEmoji from 'react-emoji';
import Snackbar from 'material-ui/Snackbar';
import SBStore from '../../stores/sbStore';
import SBChat from '../messaging/sbChat';
import SBUserList from '../messaging/sbUserList';
import LoginComponents from '../messaging/loginComponents';
import '../../styles/messaging.scss';

// The parent (container) for all of messaging

class messaging extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginComponents: false,
      showUserList: true,
    };
    this.store = SBStore;
  }
  render() {
    const Logged = props => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Sign out" />
        <MenuItem primaryText="Hide" onClick={() => this.openLogin()} />
      </IconMenu>
    );
    const { newMsgContent, snackbarOpen } = this.state;
    const newMsgMsg = ReactEmoji.emojify(newMsgContent) || newMsgContent;
    return (
      <MuiThemeProvider>
        <div className="messaging-wrapper">
          <AppBar
            title="Tandem Messenger"
            className="appbar"
            iconElementLeft={<IconButton><ActionHome /></IconButton>}
            iconElementRight={this.state.loggedIn ? <Logged /> : <FlatButton label="Log in" onClick={() => this.openLogin()} />}
          />
          <div className="content-wrapper-2">
            {this.state.showLoginComponents ? <LoginComponents /> : <div />}
            <SBUserList />
            <SBChat />
          </div>
          <Snackbar
            open={snackbarOpen}
            message={newMsgMsg}
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }

  handleRequestClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };
  openLogin() {
    if (this.state.showLoginComponents) {
      this.setState({
        showLoginComponents: false,
      });
    } else {
      this.setState({
        showLoginComponents: true,
      });
    }
  }
  handleChange() {
    if (this.state.showUserList) {
      this.setState({
        showUserList: false,
      });
    } else {
      this.setState({
        showUserList: true,
      });
    }
  }
}

export default messaging;
