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
import SBStore from '../../stores/sbStore';
import SBChat from '../messaging/sbChat';
import SBUserList from '../messaging/sbUserList';
import LoginComponents from '../messaging/loginComponents';
import '../../styles/messaging.scss';

class messaging extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginComponents: false,
      showUserList: true,
    };
    this.stores = SBStore;
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
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
    return (
      <MuiThemeProvider>
        <div className="messaging-wrapper">
          <AppBar
            title="Tandem Messenger"
            iconElementLeft={<IconButton><ActionHome /></IconButton>}
            iconElementRight={this.state.loggedIn ? <Logged /> : <FlatButton label="Log in" onClick={() => this.openLogin()} />}
          />
          <div className="content-wrapper-2">
            {this.state.showLoginComponents ? <LoginComponents /> : <div />}
            <SBUserList />
            <SBChat />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
  // style={{ position: 'absolute',
  // left: '50%',
  // transform: 'translateX(-50%)',
  // display: 'flex',
  // flexDirection: 'column'
  // }}
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
