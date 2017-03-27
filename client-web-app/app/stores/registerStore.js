import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';
import config from '../../../common/config';
import SBActions from '../actions/sbActions';

const prefix = require('superagent-prefix')(config.server);

class RegisterStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      message: '',
      errorEm: '',
      errorPass: '',
      errorRepass: '',
    };
    this.listenables = actions;
  }

  usernameAction(input) {
    this.setState({
      username: input.target.value,
    });
  }

  emailAction(input) {
    this.setState({
      email: input.target.value,
    });
  }

  passwordAction(input) {
    this.setState({
      password: input.target.value,
    });
  }

  repPA(input) {
    this.setState({
      repassword: input.target.value,
    });
  }

  submitClickCompleted(res) {
    SBActions.createUser(this.state.email, this.state.username);
    this.setState({
      message: res.body.message,
      errorEm: '',
      errorPass: '',
      errorRepass: '',
    });
  }
  submitClickFailed(res) {
    this.setState({
      message: res.body.message,
      errorEm: res.body.errors.email,
      errorPass: res.body.errors.password,
      errorRepass: res.body.errors.repassword,
    });
  }

}
// how to get actual email and password of component!
actions.submitClick.listen((username, email, password, repassword) => {
  request.put('/register/')
  .use(prefix)
  .send({ username, email, password, repassword })
  .end((err, res) => {
    if (err) {
      actions.submitClick.failed(res);
    } else {
      actions.submitClick.completed(res);
    }
  });
});

export default RegisterStore;
