import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

class UserCard extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <MuiThemeProvider >
        <Card className="containerSmall">
          <CardMedia
            overlay={<p className="overlay"> John Doe, 69 </p>}
          />
          <CardText>
            <p>
            Send nudes? Porfavor mi amor! And so on...
            </p>
            <Divider className="cardDivider" />
            <p> Speaks: GB     Practices: FR </p>
          </CardText>
          <RaisedButton className="overlay" primary="1" fullWidth="true"> Chat! </RaisedButton>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default UserCard;
