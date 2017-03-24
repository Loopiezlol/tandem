import moment from 'moment';
import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ReactEmoji from 'react-emoji';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { blue500, red200, cyan500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import SBStore from '../../stores/sbStore';
import '../../styles/sbChat.scss';
import SBActions from '../../actions/sbActions';

// Component that is rendered when user selects to block/report in a chat

class abuseComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.store = SBStore;
  }

  render() {
    return (
      <div>
        <h1>block/report user</h1>
      </div>
    );
  }
}


export default abuseComponent;
