import React from 'react';
import Reflux from 'reflux';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import '../styles/discover.scss';
import '../styles/flags.min.css';


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
          <img
            src={require('../resources/transperant.png')}
            className={me.mainLanguage.abbreviation ? `flag flag-${me.mainLanguage.abbreviation}` : ''}
            alt={me.mainLanguage.name}
          />
          <br />
          Practices: {me.wantsToLearn.map(l =>
          (<span>
            {`${l.languageId.name}`.toString()}
            <img
              src={require('../resources/transperant.png')}
              className={l.languageId.abbreviation ? `flag flag-${l.languageId.abbreviation}` : ''}
              alt={l.languageId.name}
            />
          </span>))}
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
