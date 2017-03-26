import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import { List, ListItem } from 'material-ui/List';
import Infinite from 'react-infinite';
import CustomCarousel from '../Onboarding/CustomCarousel';
import MeStore from '../../stores/MeStore';
import LevelStore from '../../stores/levelStore';
import LanguageStore from '../../stores/languageStore';
import interestsData from '../../interests';

import Auth from '../../stores/auth';

import actions from '../../actions/actions';
import MeActions from '../../actions/MeActions';
import '../../styles/User/User.scss';

class User extends Reflux.Component {

  constructor(props) {
    super(props);
    this.stores = [Auth, MeStore, LevelStore, LanguageStore];
    actions.fetchLanguages();
    actions.fetchLevels();
    this.state = {
      selectorBg: 'bg-info',
      addNewFamLangBtnLabel: 'Add',
      interestsSelectorHeader: 'selectorHeader',
      carouselIndex: 0,
      btnLabel: 'Save notes',
      btnState: 'updateNotesBtn-appear',
      currentUserLanguages: [],
      tempUser: {},
      currentSelectedLanguage: '',
      currentSelectedLanguageLevel: '',
      newFamLang: '',
      newFamLangLevel: '',
      selectedHobby: '',
    };
  }

  componentDidUpdate() {
    if (Object.keys(this.state.tempUser).length === 0 &&
        this.state.me) {
      this.setState({
        tempUser: this.state.me,
        currentSelectedLanguage: this.state.me.wantsToLearn[0].name,
        currentSelectedLanguageLevel: this.state.me.wantsToLearn[0].level,
      });
    }
  }


  changeSelector = (idx) => {
    switch (idx) {
      case 0:

        this.setState({ selectorBg: 'bg-info' });
        break;
      case 1:

        this.setState({ selectorBg: 'bg-languages', isBlurred: '', addNewFamLang: false });
        break;
      case 2:

        this.setState({ selectorBg: 'bg-interests', isBlurred: '' });
        break;
      default:

        this.setState({ selectorBg: 'bg-info' });
        break;
    }
  };

  selectFamLang = (event, index, value) => {
    this.setState({
      currentSelectedLanguage: value,
      currentSelectedLanguageLevel: (this.state.tempUser.wantsToLearn || [])
        .find(l => l.name === value).level,
    });
  }

  addNotes = (hobby, index) => {
    // MeActions.selectHobby(hobby);
    this.setState({ addNotes: hobby, visibilityHeader: 'hiddenHeader', carouselIndex: index, selectedHobby: interestsData.find(i => i.label === hobby.name), updatingNotes: this.state.tempUser.interests.find(i => i.name === hobby.name).notes });
  }

  closeNotes = () => {
    this.setState({ addNotes: null, visibilityHeader: 'visibleHeader' });
  }

  addNewFamLang = () => {
    // TODO: check if newFamLang is valid language
    const { newFamLang, newFamLangLevel, tempUser } = this.state;
    tempUser.wantsToLearn.push({
      name: newFamLang,
      level: newFamLangLevel,
    });
    this.setState({ addNewFamLangBtnLabel: 'Added', tempUser });
  }

  updateNewFamLanguage = (v) => {
    if (this.state.addNewFamLangBtnLabel !== 'Add') {
      this.setState({
        addNewFamLangBtnLabel: 'Add',
        newFamLang: v,
      });
    } else {
      this.setState({
        newFamLang: v,
      });
    }
  }

  updateNewFamLangLevel = (e, i, v) => {
    this.setState({
      newFamLangLevel: v,
    });
  }

  updateMotherLanguage = (e) => {
    // if (this.state.languages.find(l => l === e.target.value)) {
    //   this.setState({
    //     updateMotherLanguage
    //   })
    // }
    console.log(e.target.value);
    this.setState({
      updatingMotherLang: e.target.value,
    }, () => {
      if (this.state.languages.find(l => l.name === this.state.updatingMotherLang)) {
        const tempUser = this.state.tempUser;
        tempUser.mainLanguage = this.state.languages
          .find(l => l.name === this.state.updatingMotherLang);
        this.setState({
          tempUser,
        });
      }
    });
  }


  showFamLangPopUp = () => {
    this.setState({ addNewFamLang: true, famLangBoxAppear: 'popUpBewFamLangBox-appear', isBlurred: 'selector-blurred' });
  }

  closeNewFamLangPopUp = () => {
    if (this.state.addNewFamLang) {
      this.setState({ addNewFamLang: false, famLangBoxAppear: '', isBlurred: '' });
    }
  }

  saveTempUser = () => {
    console.log('updating temp user');
    actions.updateTempUser(this.state.tempUser);
  }

  saveNotes = () => {
    const { addNotes, tempUser, updatingNotes } = this.state;
    addNotes.notes = updatingNotes;

    const hobbyIndex = tempUser.interests.findIndex(int => int.name === addNotes.name);

    tempUser.interests[hobbyIndex].notes = updatingNotes;
    this.setState({ btnLabel: 'Saved', btnState: 'updateNotesBtn-leave', addNotes, tempUser });
    const x = this;
    setTimeout(() => {
      x.setState({ btnLabel: 'Save notes', btnState: 'updateNotesBtn-appear' });
    }, 2000);
  }


  showInterestsList = () => {
    this.setState({ showList: true, isBlurred: 'selector-blurred' });
  }

  closeInterestsList = () => {
    if (this.state.showList) {
      this.setState({ showList: false, isBlurred: '' });
    }
  }

  changeCurrentLanguageLevel = (e, i, v) => {
    const currentLangaugeIndex = this.state.tempUser.wantsToLearn.findIndex(l =>
      this.state.currentSelectedLanguage === l.name);
    const tempUserToModify = this.state.tempUser;
    tempUserToModify.wantsToLearn[currentLangaugeIndex].level = v;
    this.setState({
      currentSelectedLanguageLevel: v,
      tempUser: tempUserToModify,
    });
  }

  render() {
    const selectors = ['info', 'chatting', 'heart'].map((selector, index) => {
      const source = `${selector}.png`;
      return (
        <img src={require(`../../../public/userProfile/${source}`)} className="selector" onClick={() => this.changeSelector(index)} />
      );
    });
    const infoSelector = (
      <div className="genericSelectorWrap">
        <h1 className="selectorHeader">Information</h1>
        <div className="nameWrap">
          <p className="propLabel" id="nameLabel">Name</p>
          <p className="dataLabel" id="nameData">{this.state.tempUser.firstName} {this.state.tempUser.lastName}</p>
        </div>
        <div className="usernameWrap">
          <p className="propLabel" id="usernameLabel">Username</p>
          <p className="dataLabel" id="usernamenameData">{this.state.tempUser.username}</p>
        </div>
        <div className="ageWrap">
          <p className="propLabel" id="ageLabel" >Age</p>
          <p className="dataLabel" id="ageData">{this.state.tempUser.age ?
            this.state.tempUser.age : 'please contact us to update your age'}</p>
        </div>
        <div className="genderWrap">
          <p className="propLabel" id="genderLabel">Gender</p>
          <p className="dataLabel" id="genderData">{this.state.tempUser.gender ?
           this.state.tempUser.gender : 'please contact us to update your gender'}</p>
        </div>
      </div>
    );

    const familiarLanguages = (this.state.tempUser.wantsToLearn || []).map(lang => (
      <MenuItem
        value={lang.name}
        primaryText={lang.name}
      />
      ));

    const languageLevels = () => (this.state.tempUser.wantsToLearn || [])
    .filter(l => this.state.currentSelectedLanguageLevel === l.level)
    .map(lang =>
      <DropDownMenu
        className="famLangLevel"
        value={lang.level}
        onChange={this.changeCurrentLanguageLevel}
      >
        {this.state.levels.map(l =>
          <MenuItem
            key={`menu-item-${l.name}`}
            value={l.name} primaryText={l.name}
          />)}
      </DropDownMenu>,
      );

    // TODO: remove motherLanguage + languages already set
    const newFamLangBox = (
      <Paper className="newFamLangContainer" >
        <AutoComplete
          hintText="Language"
          searchText={this.state.newFamLangInput}
          dataSource={(this.state.languages || []).map(l => l.name)}
          onUpdateInput={e => this.updateNewFamLanguage(e)}
          className="newFamLangsList"
        />
        <span className="newFamLangLangLevel">
          <DropDownMenu
            className="famLangLevel"
            value={this.state.newFamLangLevel}
            onChange={this.updateNewFamLangLevel}
          >
            {this.state.levels.map(l =>
              <MenuItem
                key={`menu-item-${l.name}`}
                value={l.name} primaryText={l.name}
              />)}
          </DropDownMenu>

        </span>
        <FlatButton className="newFamLangAddBtn" onClick={this.addNewFamLang}>
          {this.state.addNewFamLangBtnLabel}
        </FlatButton>
      </Paper>
    );


    const languagesSelector = (
      <div className="genericSelectorWrap" >
        <div className="popUpnewFamLangBox" id={this.state.famLangBoxAppear}>
          {this.state.addNewFamLang && newFamLangBox }
        </div>
        <div id={this.state.isBlurred} onClick={this.closeNewFamLangPopUp}>
          <h1 className="selectorHeader">Languages</h1>
          <div className="motherLanguageWrap" >
            <p className="propLabel" id="motherLangLabel">Mother language</p>
            <p className="dataLabel" id="motherLangDataLabel">{this.state.userInfo.motherLanguage}</p>
{/* =======
            {
              this.state.enableEdit ? <div id="motherLanguaeEdit">
                <TextField
                  className="data motherLangInputEdit"
                  value={(this.state.updatingMotherLang)}
                  onChange={this.updateMotherLanguage}
                />
              </div> :
              <p className="dataLabel" id="motherLangDataLabel">{(this.state.tempUser.mainLanguage || {}).name} </p>
            }
>>>>>>> develop */}
          </div>
          <div className="famLangWrapper">
            <p className="propLabel" id="famLangLabel">Familiar languages</p>
            <div>
              <p className="langLevelLabels" id="langLabel">Language</p>
              <p className="langLevelLabels" id="levelLabel">Level</p>
            </div>
            <div className="famLangListWrap">
              <SelectField
                value={this.state.currentSelectedLanguage}
                onChange={this.selectFamLang}
                className="famLangList"
                labelStyle={{ fontFamily: '"Dosis", sans-serif',
                  fontSize: '25px',
                  float: 'left' }}
              >
                {familiarLanguages}
              </SelectField>
              {languageLevels()}
            </div>
            <span>
              <FlatButton
                onClick={this.showFamLangPopUp}
                id="addNewFamLangBtn"
                backgroundColor="#4e8e48"
                hoverColor="#57ad4f"
              >
                Add more
              </FlatButton>
            </span>
          </div>
        </div>

      </div>
    );

    const notes = (
      <div className="choiceNotesWrap">
        <Paper
          className="interestNotesWrap"
        >
          <img src={(this.state.selectedHobby || {}).icon ? require(`../../../public/png/${(this.state.selectedHobby || {}).icon}.png`) : null} className="notesInterestIcon" />
          <div>
            <p className="interestLabel notesInterestLabel">{(this.state.addNotes || {}).name}</p>
          </div>
          <span><img className="chosenInterestNotes" src={require('../../../public/notes-selected.png')} /></span>
        </Paper>
        <span id="notesBubbleWrap"> <img src={require('../../../public/notesBubble.png')} id="notesBubbleIcon" onClick={this.closeNotes} />

          <TextField
            hintText={`Share something about ${(this.state.addNotes || {}).name}`}
            value={this.state.updatingNotes || (this.state.addNotes || {}).notes}
            onChange={e => MeActions.updateNotesField(e)}
            multiLine
            rowsMax={5}
            className="notesInputFieldUserProfile"
          />

          {(this.state.addNotes || {}).notes !== this.state.updatingNotes && <FlatButton className="updateNotesBtn" id={this.state.btnState} onClick={this.saveNotes}>{this.state.btnLabel}</FlatButton>}
        </span>
      </div>
    );


    const decorators = [{
      component: ({ previousSlide }) => (
        <i className="material-icons" id="prevArrow" onClick={previousSlide}>&#xE314;</i>
          ),
      position: 'CenterLeft',
    },
    {
      component: ({ nextSlide }) => (
        <i className="material-icons" id="nextArrow" onClick={nextSlide}>&#xE315;</i>
          ),
      position: 'CenterRight',
    },
    ];

    const interests = (this.state.tempUser.interests || []).map((hobby, index) => {
      const source = `/png/${interestsData.find(i => i.label === hobby.name).icon}.png`;
      return (
        <Paper className="interestCardWrap">
          <Paper className="cardHeaderWrap">
            <img src={hobby ? require(`../../../public${source}`) : null} className="interestCardIcon" />
          </Paper>

          <span className="circleNotesWrap" onClick={() => this.addNotes(hobby, index)}><img src={require('../../../public/notes.png')} className="circleNotesIcon" /></span>

          <Paper className="cardFooterWrap">
            <p className="cardLabel">{hobby.name}</p>
          </Paper>

        </Paper>
      );
    });

    const plusSign = (
      <Paper className="addInterestWrap" onClick={this.showInterestsList}>
        <span>
          <img src={require('../../../public/png/add.png')} className="interestCardIcon" />
        </span>
        <p id="addInterestLabel">Add more</p>
      </Paper>
    );
    interests.push(plusSign);


    const listContent = interestsData.map((interest) => {
      const source = `/png/${interest.icon}.png`;
      const checked = [];
      (this.state.tempUser.interests || []).forEach((userInterest) => {
        if (!checked.includes(interest)) {
          if (userInterest.label === interest.label) {
            interest.state = 'selected';    //eslint-disable-line
            checked.push(interest);
          } else {
            interest.state = 'unselected';    //eslint-disable-line
          }
        }
      });
      return (
        <ListItem id="singleInterestContainer" onClick={() => MeActions.addInterest(interest)}>
          <Avatar id="interestAvatarIcon" src={interest.icon ? require(`../../../public${source}`) : null} />
          <p id="interestListLabel">{interest.label}</p>

          <p className="heartIcon" id={`interest-${interest.state}`} >❤</p>

        </ListItem>
      );
    });

    const interestsList = (
      <Paper id="listContainer">
        <List id="interestsContainer">
          <Infinite containerHeight={280} elementHeight={60}>
            {listContent}
          </Infinite>
        </List>
      </Paper>
    );


    const interestsSelector = (
      <div className="genericSelectorWrap">
        <span id="popupList">
          {this.state.showList && interestsList}
        </span>
        <div id={this.state.isBlurred} onClick={this.closeInterestsList} >
          <div id={this.state.visibilityHeader}>
            <h1 className="selectorHeader">Interests</h1>
          </div>
          <div className="notesField">
            {this.state.addNotes != null && notes}
          </div>
          <div className="choicesWrap">
            {this.state.addNotes == null &&
            <CustomCarousel
              slideIndex={this.state.carouselIndex}
              slidesToShow={1}
              decorators={decorators}
              className="userInterestsCarouselWrap"
              content={interests}
            />}
          </div>
        </div>
      </div>
    );


    return (
      <div className="userProfileWrap">
        <img src={require('../../../public/boss.png')} className="profileImg" />
        <MuiThemeProvider>
          <Paper className="userInfoWrap" zDepth={1}>
            <div className="selectorsWrap" >
              <MuiThemeProvider>
                <Paper className="selectorsContainer" zDepth={1} >
                  {selectors}
                </Paper>
              </MuiThemeProvider>
            </div>
            <div className="selectorDataWrap">
              <span className="backgroundSelector" id={this.state.selectorBg} />
              <MuiThemeProvider>
                <Paper className="selectorDataContainer" >
                  {this.state.selectorBg === 'bg-info' && infoSelector}
                  {this.state.selectorBg === 'bg-languages' && languagesSelector}
                  {this.state.selectorBg === 'bg-interests' && interestsSelector}
                </Paper>
              </MuiThemeProvider>
            </div>
            <FlatButton className="saveButton" onClick={this.saveTempUser}>
              Save user here
            </FlatButton>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default User;
