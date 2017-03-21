import React from 'react';
import Reflux from 'reflux';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import '../styles/discover.scss';
import '../styles/flags.min.css';

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
            src={require('../../public/transperant.png')}
            className={me.mainLanguage.abbreviation.toLowerCase() ? `flag flag-${me.mainLanguage.abbreviation.toLowerCase()}` : ''}
            alt={me.mainLanguage.name}
            style={{ backgroundImage: require('../../public/flags.png') }}
          />
          <br />
          Practices: {me.wantsToLearn.map(l =>
          (<span>
            {`${l.languageId.name}`.toString()}
            <img
              src={require('../../public/transperant.png')}
              className={l.languageId.abbreviation.toLowerCase() ? `flag flag-${l.languageId.abbreviation.toLowerCase()}` : ''}
              alt={l.languageId.name}
              style={{ backgroundImage: require('../../public/flags.png') }}
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
