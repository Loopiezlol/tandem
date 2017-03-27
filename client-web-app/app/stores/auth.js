import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';

class Auth extends Reflux.Store {
  constructor() {
    super();
    this.listenables = actions;
    const jwt = window.localStorage.getItem('jwt');
    this.state = {
      status: jwt ? 'in' : 'off',
      me: {},
    };
    if (this.jwt || Object.keys(this.state.me).length === 0) {
      actions.meFromToken(jwt);
    }
  }

//eslint-disable-next-line
  handleLoginCompleted(res) {
    if (res.body.token) {
      const jwt = res.body.token;
      localStorage.setItem('jwt', jwt);
      actions.meFromToken(jwt);
    } else {
      console.log('error getting token');
    }
  }
  //eslint-disable-next-line
  handleLoginFailed(res) {
    this.setState({
      status: 'off',
      me: {},
    });
  }

  meFromTokenCompleted(res) {
    this.setState({
      me: res.body.user,
      status: 'in',
    });
  }

  meFromTokenFailed() {
    this.setState({
      status: 'off',
      me: {},
    });
  }

  updateTempUserCompleted() {
    // this.setState({
    //   me: res.body.user,
    // });
  }

  updateTempUserFailed(err) {
    console.log(err);
  }

  handleLogOut() {
    localStorage.removeItem('jwt');
    this.jwt = '';
    this.setState({
      status: 'off',
      me: {},
    });
  }

}

actions.meFromToken.listen((token) => {
  request.put('http://localhost:3000/me')
  .send({ token })
  .end((err, res) => {
    if (err) {
      actions.meFromToken.failed(err);
    } else {
      actions.meFromToken.completed(res);
    }
  });
});

actions.updateTempUser.listen((tempUser) => {
  request.put('http://localhost:3000/me/update')
  .send({ tempUser })
  .set('x-access-token', localStorage.getItem('jwt'))
  .end((err, res) => {
    if (err) {
      actions.updateTempUser.failed(err);
    } else {
      actions.updateTempUser.completed(res);
    }
  });
});

export default Auth;
