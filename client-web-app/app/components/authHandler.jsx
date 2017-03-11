import React from 'react';
import { hashHistory } from 'react-router';
import Reflux from 'reflux';
import Auth from '../stores/auth';
import actions from '../actions';

class AuthHandler extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Auth;
  }

  render() {
    return this.props.children;
  }

  componentDidMount() {
    switch (this.state.status) {
      case 'in':
        hashHistory.push('/user');
        break;
      default:
        console.log('not logged in');
    }
  }
}

export default AuthHandler;
