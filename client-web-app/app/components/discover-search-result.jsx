import React from 'react';
import Reflux from 'reflux';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

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
        <CardMedia
          overlay={<CardTitle title={me.userName} className="userName" />}
        >
          <img className="img" src={imgUrl} />
        </CardMedia>
        <CardText className="languages">
          <span className="speaks">Speaks:</span>
          <IconButton
            className="tooltip"
            tooltip={<div> {me.mainLanguage.name} Level: {me.mainLanguage.level} </div>}
          >
            <img
              src={require('../../public/transperant.png')}
              className={me.mainLanguage.abbreviation ? `flag flag-${me.mainLanguage.abbreviation.toLowerCase()}` : ''}
              alt={me.mainLanguage.name}
              style={{ backgroundImage: require('../../public/flags.png') }}
            />
          </IconButton>
        </CardText>
        <Divider className="cardDivider" />
        <CardText className="languages">
          <span className="speaks">Practices:</span>
          {me.wantsToLearn.map(l =>
          (<IconButton
            className="tooltip"
            tooltip={<div> {`${l.languageId.name}`.toString()} Level: {me.mainLanguage.level} </div>}
          >
            <img
              src={require('../../public/transperant.png')}
              className={l.languageId.abbreviation.toLowerCase() ? `flag flag-${l.languageId.abbreviation.toLowerCase()}` : ''}
              alt={l.languageId.name}
              style={{ backgroundImage: require('../../public/flags.png') }}
            />
          </IconButton>))}
        </CardText>
        <Divider className="cardDivider" />
        <CardText className="languages" >
          <span className="speaks">Interests:</span>
          {me.interests.map(x =>
            <IconButton tooltip={x.name} tooltipPosition="top-center">
              <img
                className="interests-img"
                src={require(`../../public/png/${interestsDetails[interestsDetails.findIndex(det => det.label === x.name)].icon}.png`)}
              />
            </IconButton>)}
        </CardText>
        <FlatButton className="chatButton" onTouchTap={() => console.log(me)} primary fullWidth> Chat! </FlatButton>
      </Card>
    );
  }
}

export default UserCard;
