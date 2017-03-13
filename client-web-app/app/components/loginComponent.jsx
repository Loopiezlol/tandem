import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import actions from '../actions/actions';
import LoginStore from '../stores/loginStore';


class LoginComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = LoginStore;
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
