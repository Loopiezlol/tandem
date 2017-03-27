import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RegisterStore from '../stores/registerStore';
import actions from '../actions/actions';
import '../styles/login.scss';


class RegisterComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = RegisterStore;
  }


  render() {
    const { username, email, password, repassword, message, errorEm, errorPass, errorRepass }
    = this.state;

    const passwdError = { position: 'absolute', marginBottom: '-60px', width: '260px', height: '50px', textAlign:'left' };

    return (
      <div className="mainSignWrap">
        <MuiThemeProvider >
          <Card className="mainRegisterContainer">
            <h2 className="card-heading"> Register </h2>
            { message && <p className="error-message" >{message}</p> }
            <form action="/">
              <div className="field-line">
                <TextField
                  hintText="Your Username"
                  floatingLabelText="Username"
                  value={username}
                  onChange={actions.usernameAction}
                />
              </div>
              <div className="field-line">
                <TextField
                  hintText="Your KCL Email"
                  floatingLabelText="E-mail"
                  value={email}
                  errorText={errorEm}
                  errorStyle={{ position: 'absolute', marginBottom: '-20px' }}
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
                  errorStyle={passwdError}
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
                  errorStyle={{ position: 'absolute', marginBottom: '-20px' }}
                  onChange={actions.repPA}
                />
              </div>
              <div className="button-line">
                <br />
                <RaisedButton
                  className="form-button"
                  primary="true"
                  onClick={() => actions.submitClick(username, email, password, repassword)}
                >
                  Sign up!
                </RaisedButton>
              </div>
              <CardText>Already have an account? <Link to={'/login'}>Sign in!</Link></CardText>
            </form>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default RegisterComponent;
