import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LoginStore from '../stores/loginStore';
import actions from '../actions';


class LoginComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = LoginStore;
  }
  render() {
    const { email, password, repassword, error } = this.state;
    return (
      <MuiThemeProvider >
        <Card style={{ display: 'inline-block' }}>
          <CardHeader
            title="Register to our app"
          />
          <form >
            <div>
              <TextField
                align="center"
                type="email"
                hintText="Your KCL Email"
                floatingLabelText="E-mail"
                value={email}
                onChange={actions.emailAction}
                errorText={error}
              />
            </div>
            <div>
              <TextField
                style={{ display: 'inline-block' }}
                type="password"
                hintText="Your Password"
                floatingLabelText="Password"
                value={password}
                onChange={actions.passwordAction}

              />
            </div>
            <div>
              <TextField
                type="password"
                hintText="Your Password"
                floatingLabelText="Repeat password"
                value={repassword}
                onChange={actions.repPA}
              />
            </div>
            <div>
              <br />
              <RaisedButton
                fullWidth="true"
                primary="true"
                onClick={() => actions.getUsers()}
              >
                Sign in!
              </RaisedButton>
            </div>
          </form>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default LoginComponent;
