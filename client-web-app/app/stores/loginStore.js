import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions';

class LoginStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      repassword: '',
      error: '',
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
}
// how to get actual email and password of component!
actions.submitClick.listen((email, password) => {
  request.put('http://localhost:3000/login/')
  .send({ email: { email }, password: { password } })
  .end((err, res) => {
    if (err) {
      // handle error
    }
    console.log(res);
    // handle no error
  });
});

export default LoginStore;
