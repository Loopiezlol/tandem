import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions';
import SBActions from '../actions/sbActions';

class LoginStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      emailL: '',
      passwordL: '',
      messageL: '',
      errorEmL: '',
      errorPassL: '',
    };
    this.listenables = actions;
  }

  emailActionL(input) {
    this.setState({
      emailL: input.target.value,
    });
  }

  passwordActionL(input) {
    this.setState({
      passwordL: input.target.value,
    });
  }

  submitClickLCompleted(res) {
    if (res.body.message === 'This should get you to the dashboard now') SBActions.loginUser(this.state.emailL);
    this.setState({
      messageL: res.body.message,
      errorEmL: res.body.errors.email,
      errorPassL: res.body.errors.password,
    });
  }
  submitClickLFailed(res) {
    this.setState({
      messageL: res.body.message,
      errorEmL: res.body.errors.email,
      errorPassL: res.body.errors.password,
    });
  }

}
// how to get actual email and password of component!
actions.submitClickL.listen((email, password) => {
  request.put('http://localhost:3000/login/')
  .send({ email, password })
  .end((err, res) => {
    if (err) {
      actions.submitClickL.failed(res);
    } else {
      actions.submitClickL.completed(res);
    }
  });
});

export default LoginStore;
