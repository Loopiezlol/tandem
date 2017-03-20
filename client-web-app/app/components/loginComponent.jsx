import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link, hashHistory } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import actions from '../actions';
import LoginStore from '../stores/loginStore';
import Auth from '../stores/auth';


class LoginComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stores = [LoginStore, Auth];
  }

  componentDidMount() {
    if (this.state.status === 'in') {
      this.props.router.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.status !== prevState.status) {
      if (this.state.status === 'in') {
        this.props.router.push('/');
      }
    }
  }
  render() {
    const { emailL, passwordL, messageL, errorEmL, errorPassL } = this.state;
    return (
      <MuiThemeProvider >
        <Card className="container">
          <h2 className="card-heading"> Login </h2>
          { messageL && <p className="error-message">{messageL}</p> }
          <form action="/">
            <div className="field-line">
              <TextField
                hintText="Your KCL Email"
                floatingLabelText="E-mail"
                value={emailL}
                errorText={errorEmL}
                onChange={actions.emailActionL}
              />
            </div>
            <div className="field-line">
              <TextField
                type="password"
                hintText="Your Password"
                floatingLabelText="Password"
                value={passwordL}
                errorText={errorPassL}
                onChange={actions.passwordActionL}
              />
            </div>
            <div className="button-line">
              <br />
              <RaisedButton
                onClick={() => actions.submitClickL(emailL, passwordL)}
                primary="true"
              >
                Sign in!
              </RaisedButton>
            </div>
            <CardText>Don't have an account? <Link to={'/register'}>Sign up!</Link></CardText>
          </form>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default LoginComponent;
