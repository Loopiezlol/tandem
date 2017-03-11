import { hashHistory } from 'react-router';
import Reflux from 'reflux';
// import React from 'react';
import Auth from '../stores/auth';

class AuthHandler extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Auth;
  }

  render() {
    return this.props.children;
  }

  componentDidMount() {
    if (this.state.status === 'in') {
      // could be improved with indexroute I guess
      // Currently set the main page as /message because we didn't have another one
      hashHistory.push('/message');
    } else {
      hashHistory.push('/login');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status ||
      this.props.children === null) {
      if (this.state.status === 'in') {
        // must change main route here as well
        hashHistory.push('/message');
      } else {
        hashHistory.push('/login');
      }
    }
  }
}

export default AuthHandler;
