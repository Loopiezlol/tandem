import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';

class RegisterStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '',
      errorEm: '',
      errorPass: '',
      errorRepass: '',
    };
    this.listenables = actions;
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
actions.submitClick.listen((email, password, repassword) => {
  request.put('http://localhost:3000/register/')
  .send({ email, password, repassword })
  .end((err, res) => {
    if (err) {
      actions.submitClick.failed(res);
    } else {
      actions.submitClick.completed(res);
    }
  });
});

export default RegisterStore;
