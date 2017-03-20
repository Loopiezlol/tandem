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
    const { status, me } = this.state;
    if (status === 'in' && this.props.children === null) {
      // could be improved with indexroute I guess
      // Currently set the main page as /message because we didn't have another one
      console.log(me);
      if (me || me.onboardingDone) {
        hashHistory.push('/');
      } else {
        hashHistory.push('/onboarding');
      }
    } else if (status === 'off') {
      hashHistory.push('/login');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { status, me } = this.state;
    if (prevState.status !== status ||
      this.props.children === null) {
      if (status === 'in') {
        console.log(me);
        // must change main route here as well
        // if (me.onboardingDone) {
        //   hashHistory.push('/');
        // } else {
        //   hashHistory.push('/onboarding');
        // }
        hashHistory.push('/onboarding');
      } else {
        hashHistory.push('/login');
      }
    }
  }
}

export default AuthHandler;
