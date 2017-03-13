import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RegisterStore from '../stores/registerStore';
import actions from '../actions/actions';


class RegisterComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = RegisterStore;
  }
  render() {
    const { email, password, repassword, message, errorEm, errorPass, errorRepass } = this.state;
    return (
      <MuiThemeProvider >
        <Card className="container">
          <h2 className="card-heading"> Register </h2>
          { message && <p className="error-message">{message}</p> }
          <form action="/">
            <div className="field-line">
              <TextField
                hintText="Your KCL Email"
                floatingLabelText="E-mail"
                value={email}
                errorText={errorEm}
                onChange={actions.emailAction}
              />
            </div>
            <div className="field-line">
              <TextField
                type="password"
                hintText="Your Password"
                floatingLabelText="Password"
                value={password}
                errorText={errorPass}
                onChange={actions.passwordAction}
              />
            </div>
            <div className="field-line">
              <TextField
                type="password"
                hintText="Your Password"
                floatingLabelText="Repeat password"
                value={repassword}
                errorText={errorRepass}
                onChange={actions.repPA}
              />
            </div>
            <div className="button-line">
              <br />
              <RaisedButton
                className="form-button"
                primary="true"
                onClick={() => actions.submitClick(email, password, repassword)}
              >
                Sign up!
              </RaisedButton>
            </div>
            <CardText>Already have an account? <Link to={'/login'}>Sign in!</Link></CardText>
          </form>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default RegisterComponent;
