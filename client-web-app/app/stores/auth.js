import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions';

class Auth extends Reflux.Store {
  constructor() {
    super();
    this.listenables = actions;
    this.jwt = window.localStorage.getItem('jwt');
    this.state = {
      status: this.jwt ? 'in' : 'off',
      me: {},
    };
    if (this.jwt) {
      actions.meFromToken(this.jwt);
    }
  }

//eslint-disable-next-line
  handleLoginCompleted(res) {
    if (res.body.token) {
      this.jwt = res.body.token;
      localStorage.setItem('jwt', this.jwt);
      actions.meFromToken(this.jwt);
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
      token: res.body.token,
      status: 'in',
    });
  }

  meFromTokenFailed() {
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
      actions.meFromToken.failed(res);
    } else {
      actions.meFromToken.completed(res);
    }
  });
});

export default Auth;
