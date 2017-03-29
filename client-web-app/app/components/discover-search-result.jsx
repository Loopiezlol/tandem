import React from 'react';
import Reflux from 'reflux';
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';


import '../styles/discover.scss';
import '../styles/flags.min.css';

import interestsDetails from '../interests';

require('../../public/flags.png');

class UserCard extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleExpandChange = () => {
    if (this.state.expanded === true) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded: true });
    }
  };
  render() {
    const { me } = this.props;
    const loadedImg = (me || {}).profilePicture;
    const imgUrl = loadedImg ? `data:image/jpeg;base64, ${loadedImg}` : require('../../public/boss.png');
    if (Object.keys(me).length > 0) {
      return (
        <Card
          className="result"
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
          onClick={this.handleExpandChange}
        >
          <CardMedia
            overlay={<CardTitle title={`${(me || {}).username}, ${(me || {}).age}`} className="userName" />}
          >
            <img className="img" src={imgUrl} />
          </CardMedia>]
          <CardText className={`interests ${this.state.expanded ? 'expanded' : 'reduced'}`} >
            <List>
              <CardTitle title="Interests:" />
              {me.interests.map(x =>
                <ListItem
                  primaryText={x.name}
                  leftIcon={<img src={(interestsDetails[interestsDetails.findIndex(det => det.label === x.name)] || {}).icon ? require(`../../public/png/${(interestsDetails[interestsDetails.findIndex(det => det.label === x.name)] || {}).icon}.png`) : ''} />}
                />)}
            </List>
          </CardText>
          <Divider className="cardDivider" />
          <CardText className="languages">
            <span className="speaks">Speaks:</span>
            <IconButton
              className="tooltip"
              tooltip={<div> {(me.mainLanguage || {}).name}
                Level: {(me.mainLanguage || {}).level} </div>}
            >
              <img
                src={require('../../public/transperant.png')}
                className={(me.mainLanguage || {}).abbreviation ? `flag flag-${(me.mainLanguage || {}).abbreviation.toLowerCase()}` : ''}
                alt={(me.mainLanguage || {}).name}
                style={{ backgroundImage: require('../../public/flags.png') }}
              />
            </IconButton>
            <span className="speaks">Practices:</span>
            {
              me.wantsToLearn.length === 1 ?
                <IconButton
                  className="tooltip"
                  tooltip={<div> {`${me.wantsToLearn[0].languageId.name}`.toString()} Level: {me.wantsToLearn[0].languageId.level} </div>}
                >
                  <img
                    src={require('../../public/transperant.png')}
                    className={((me.wantsToLearn || [])[0].languageId || {}).abbreviation.toLowerCase() ? `flag flag-${((me.wantsToLearn || [])[0].languageId || {}).abbreviation.toLowerCase()}` : ''}
                    alt={((me.wantsToLearn || [])[0].languageId || {}).name.toLowerCase()}
                    style={{ backgroundImage: require('../../public/flags.png') }}
                  />
                </IconButton>
              :
                <span>
                  <IconButton
                    className="tooltip"
                    tooltip={<div> {`${me.wantsToLearn[0].languageId.name}`.toString()} Level: {me.wantsToLearn[0].languageId.level} </div>}
                  >
                    <img
                      src={require('../../public/transperant.png')}
                      className={((me.wantsToLearn || [])[0].languageId || {})
                        .abbreviation.toLowerCase() ?
                        `flag flag-${((me.wantsToLearn || [])[0].languageId || {}).abbreviation.toLowerCase()}` :
                        ''}
                      alt={((me.wantsToLearn || [])[0].languageId || {}).name}
                      style={{ backgroundImage: require('../../public/flags.png') }}
                    />
                  </IconButton>
                  <IconButton
                    //eslint-disable-next-line
                    expandable={true}
                    className="tooltip"
                      //eslint-disable-next-line
                    tooltip={me.wantsToLearn.length > 0 ? me.wantsToLearn.splice(1).map(l => <div> {l.languageId.name.toString()} Level: {me.mainLanguage.level} </div>) : 'default'}
                  >
                    <Avatar
                      src={require('../../public/add-button.svg')}
                      size={20}
                    />
                  </IconButton>
                </span>
            }
          </CardText>
          <div className="chatButton">
            <CardActions>
              <FlatButton className="chatButton" onTouchTap={() => this.props.message('messaging', { id: me._id, name: me.username })}>
                  CHAT
              </FlatButton>
            </CardActions>
          </div>
        </Card>
      );
    }
    return null;
  }
}

export default UserCard;
