import React from 'react';
import Reflux from 'reflux';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import '../styles/discover.scss';
import '../styles/flags.min.css';

import interestsDetails from '../interests';

require('../../public/flags.png');

class UserCard extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { me } = this.props;
    const imgUrl = 'https://facebook.github.io/react/img/logo_og.png';
    return (
      <Card className="result" >
        <CardMedia>
          <img
            className="img"
            src={imgUrl}
            alt="bb"
          />
        </CardMedia>
        <CardTitle className="userName" title={me.username} />
        <CardTitle subtitle="Speaks:" className="speaks" />
        <CardText className="languages">
          {me.mainLanguage.name}
          <img
            src={require('../../public/transperant.png')}
            className={me.mainLanguage.abbreviation.toLowerCase() ? `flag flag-${me.mainLanguage.abbreviation.toLowerCase()}` : ''}
            alt={me.mainLanguage.name}
            style={{ backgroundImage: require('../../public/flags.png') }}
          />
        </CardText>
        <Divider className="cardDivider" />
        <CardTitle subtitle="Practices:" className="speaks" />
        <CardText className="languages">
          {me.wantsToLearn.map(l =>
        (<span>
          {`${l.languageId.name}`.toString()}
          <img
            src={require('../../public/transperant.png')}
            className={l.languageId.abbreviation.toLowerCase() ? `flag flag-${l.languageId.abbreviation.toLowerCase()}` : ''}
            alt={l.languageId.name}
            style={{ backgroundImage: require('../../public/flags.png') }}
          />
        </span>))}
        </CardText>
        <Divider className="cardDivider" />
        <CardText className="languages" >
          {me.interests.map(x => <img className="interests-img" src={require(`../../public/png/${interestsDetails[interestsDetails.findIndex(det => det.label === x.name)].icon}.png`)} />)}
        </CardText>
        <RaisedButton onTouchTap={() => console.log(me)} className="overlay" primary fullWidth="true"> Chat! </RaisedButton>
      </Card>
    );
  }
}

export default UserCard;
