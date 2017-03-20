import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
// import PictureUploader from "./PictureUploader";
import CustomCarousel from './CustomCarousel';
import '../../styles/Onboarding/DetailsForm.scss';
import OnboardingActions from '../../actions/OnboardingActions';

import OnboardingStore from '../../stores/OnboardingStore';

class DetailsForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = OnboardingStore;
    this.state = { defaultIcon: 'userDefault', charPromptLabel: 'characterPromptLabel', selectedChar: null, selectedCharacterSrc: '', charactersState: 'charAvatar', carouselState: 'carouselWrap', charactersWrapState: 'charactersWrap', sexSelected: '', goBtnState: 'goBtn', showForm: false, newProfileEnabled: false, showCharacters: false };
  }

  componentDidMount() {
    const x = this;
    function change() {
      x.setState({ showCharacters: true });
    }
    setTimeout(change, 700);
  }
    // Click event when selecting a character
  selectCharacter(e) {
    const character = e.target.name;
    let source = '';
    if (character.includes('woman')) {
      source = require(`../../../public/womanBig/${character}.png`);
    } else if (character.includes('man')) {
      source = require(`../../../public/manBig/${character}.png`);
    }
    function updateChar(self) {
      self.setState({ selectedChar: e.target }, () => {
        self.state.selectedChar.className = 'charAvatar-selected'; //eslint-disable-line
      });
    }
    if (this.state.selectedChar === null) {
      updateChar(this);
    } else if (this.state.selectedChar.name !== e.target.name) {
      this.state.selectedChar.className = 'charAvatar';
      updateChar(this);
    }
    this.setState({ selectedCharacterSrc: source, goBtnState: 'goBtn goBtn-show' });
  }
    // Confirming character selection for new profile picture
  selectCharacterDone() {
    this.setState({ showForm: true });
    const x = this;
    function expandHeight() {
      x.setState({ charactersWrapState: 'charactersWrap-expandWidth charactersWrapState-expandHeight', newProfileEnabled: true });
    }
    if (this.state.goBtnState === 'goBtn goBtn-show') {
      this.setState({ goBtnState: 'goBtn goBtn-show contentLeave', charPromptLabel: 'characterPromptLabel characterPromptLabel-leave', charactersState: 'charAvatar contentLeave', defaultIcon: 'userDefault contentLeave', carouselState: 'contentLeave' });
      setTimeout(this.setState({ charactersWrapState: 'charactersWrap-expandWidth' }), 1000);
      setTimeout(expandHeight, 1000);
    }
  }
  selectSex(e) {
    const sex = e.target.name;
    OnboardingActions.selectSex(sex);
    this.setState({ sexSelected: `selected-${sex}` });
  }
  render() {
    // Label that introduecs stage of the onnboarding process
    const label = {
      fontSize: '30px',
      position: 'relative',
      paddingTop: '50px',
      color: '#545454',
      fontFamily: "'Abel', sans-serif",
    };
    // Avatars for all the male characters
    const userManWrap = ['man', 'man-1', 'man-2', 'man-3', 'man-4'].map(man => (
      <Avatar
        className={this.state.charactersState}
        src={require(`../../../public/manSmall/${man}.png`)}
        name={man}
        onClick={e => this.selectCharacter(e)}
      />
      ));
    // Avatars for all the female characters
    const userWomanWrap = ['woman', 'woman-1', 'woman-2', 'woman-3', 'woman-4'].map(woman => (
      <Avatar
        className={this.state.charactersState}
        src={require(`../../../public/womanSmall/${woman}.png`)}
        name={woman}
        onClick={e => this.selectCharacter(e)}
      />
      ));
    // Avatar for both male and female characters
    const userProfileCharacters = [userManWrap, userWomanWrap];

    const firstNameError = (
      <span className="firstNameError">
        <span className="nameLineError" />
        <p className="nameErrorText">Please enter a valid first name</p>
      </span>
      );
    const lastNameError = (
      <span className="lastNameError">
        <span className="nameLineError" />
        <p className="nameErrorText">Please enter a valid last name</p>
      </span>
      );
    // Form for providing the information about the user
    const form = (
      <div>
        <div className="nameInputWrap">
          {this.state.firstNameError && firstNameError}
          <TextField
            id="firstName"
            floatingLabelText="First name"
            className="firstNameInput"
            onBlur={e => OnboardingActions.getDetails(e)}
          />
          {this.state.lastNameError && lastNameError}
          <TextField
            id="lastName"
            floatingLabelText="Last name"
            className="lastNameInput"
            onBlur={e => OnboardingActions.getDetails(e)}
          />
          <span className="line" />
        </div>
        <span className={this.state.sexSelected} />
        <div className="sexWrap">
          <span className="sexIconLabelWrap">
            <img src={require('../../../public/male.png')} name="male" className="sexIcon" onClick={e => this.selectSex(e)} />
            <p className="sexLabel" >Male</p>
          </span>
          <span>
            <img src={require('../../../public/female.png')} name="female" className="sexIcon" onClick={e => this.selectSex(e)} />
            <p className="sexLabel" >Female</p>
          </span>
        </div>
        <div className="ageInputWrap">
          <TextField
            id="age"
            floatingLabelText="Age"
            className="ageInput"
            onBlur={e => OnboardingActions.getDetails(e)}
          />
        </div>
      </div>
      );
    // Container for the list of characters that the user can choose for his/her profile picture
    const charactersWrap = (
      <div>
        <div className={this.state.charPromptLabel}>
          <p>Please select a character or upload your photo</p>
        </div>
        <MuiThemeProvider
          style={{ paddingTop: '5px' }}
        >
          <FlatButton
            backgroundColor="#3f577c"
            hoverColor="#496796"
            label="Go"
            labelStyle={{ color: 'white' }}
            className={this.state.goBtnState}
            onClick={() => this.selectCharacterDone()}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Paper
            className={this.state.charactersWrapState}
          >
            <CustomCarousel
              slideWidth={1}
              className={this.state.carouselState}
              content={userProfileCharacters}
            />
          </Paper>
        </MuiThemeProvider>
        {this.state.newProfileEnabled && form}
      </div>
      );
    // The user's new profile picture
    const newProfile = (
      <div>
        <img src={this.state.selectedCharacterSrc} className="newProfileImg" />
      </div>
      );
    return (
      <div>
        <div style={label}>Who are you?</div>
        <div className={this.state.defaultIcon}>
          <i
            className="material-icons userIcon"
            style={{
              fontSize: '60px',
              marginTop: '5px',
              color: '#d3d3d3' }}
          >
            account_circle
          </i>
        </div>
        {this.state.newProfileEnabled && newProfile}
        {this.state.showCharacters && charactersWrap}
      </div>
    );
  }
}
export default DetailsForm;
