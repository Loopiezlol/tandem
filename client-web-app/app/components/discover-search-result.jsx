import React from 'react';
import Reflux from 'reflux';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import '../styles/discover.scss';


// const flagUrl = require('../resources/flags.png');

class UserCard extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { me } = this.props;
    const imgUrl = 'https://facebook.github.io/react/img/logo_og.png';
    return (
      <Card className="containerSmall" >
        <CardMedia
          overlay={<p className="overlay"> {me.username} </p>}
        />
        <div >
          <img
            className="imagine"
            src={imgUrl}
            alt="bb"
          />
        </div>
        <Divider className="cardDivider" />
        <div className="speaks">
          Speaks: {me.mainLanguage.name}
          <img src={require('../resources/flags.png')} className="flag flag-cz" alt="Czech Republic" />
          <br />
          Practices: {me.wantsToLearn.map(l => (`${l.languageId.name},`)).toString().slice(0, -1)}
        </div>
        <Divider className="cardDivider" />
        <CardText>
          <div className="text description">
            {me.description}
          </div>
        </CardText>
        <RaisedButton onTouchTap={() => console.log(me)} className="overlay" primary fullWidth="true"> Chat! </RaisedButton>
      </Card>
    );
  }
}

export default UserCard;
