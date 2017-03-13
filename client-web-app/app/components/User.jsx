import React from 'react';
import Reflux from 'reflux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import Paper from '../node_modules/material-ui/Paper';
import SelectField from '../node_modules/material-ui/SelectField';
import Avatar from '../node_modules/material-ui/Avatar';
import MenuItem  from '../node_modules/material-ui/MenuItem';
import FlatButton  from '../node_modules/material-ui/FlatButton';
import TextField  from '../node_modules/material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Chip  from '../node_modules/material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import Infinite from 'react-infinite';
import LanguageLevel from './LanguageLevel';
import CustomCarousel from './CustomCarousel';
import MeStore from './stores/MeStore';
import MeActions from './actions/MeActions';

import './User.css';

class User extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = MeStore;
    this.famLangArr = [{name:'English',level:'A2'},{name:'Spanish',level:'B1'},{name:'Bulgarian',level:'C2'},{name:'Russian',level:'B2'}];
    this.state = {selectorBg:'bg-info',addNewFamLangBtnLabel:'Add',famLanguage:'English',interestsSelectorHeader:'selectorHeader',carouselIndex:0,btnLabel:'Save notes',btnState: 'updateNotesBtn-appear'};
  }

  changeSelector = (idx) => {
    switch (idx) {
      case 0:
        console.log(idx);
        this.setState({selectorBg:'bg-info'})
        break;
      case 1:
        console.log(idx);;
        this.setState({selectorBg:'bg-languages'})
        break;
      case 2:
        console.log(idx);
        this.setState({selectorBg:'bg-interests',isBlurred:''})
        break;
      default:
        console.log(idx);
        this.setState({selectorBg:'bg-info',isBlurred:''})
        break;
    }
  };

  selectFamLang = (event,index,value) => {
    this.setState({famLanguage:value});
  }

  addNotes = (hobby,index) => {
    console.log(hobby);
    MeActions.selectHobby(hobby);
    this.setState({addNotes:hobby,visibilityHeader:'hiddenHeader',carouselIndex:index}, () => {console.log(this.state.addNotes.label)});
  }

  closeNotes = () => {
    this.setState({addNotes:null,visibilityHeader:'visibleHeader'});
  }

  handleMouseEnter = () => {
    if (this.state.selectorBg === 'bg-info' || this.state.selectorBg === 'bg-languages') {
      this.setState({showEdit:true});
    }
  }

  handleMouseLeave = () => {
    if (this.state.selectorBg === 'bg-info' || this.state.selectorBg === 'bg-languages') {
      this.setState({showEdit:false});
    }
  }


  enableEdit = () => {
    if (this.state.enableEdit) {
      this.setState({enableEdit:false});
    }
    else {
      this.setState({enableEdit:true});
    }
  }


  addNewFamLang = () => {
    MeActions.addNewFamLang();
    this.setState({addNewFamLangBtnLabel:'Added'});
  }

  updateNewFamLanguage = (e) => {
      MeActions.updateNewFamLanguage(e);
      if (this.state.addNewFamLangBtnLabel !== 'Add') {
        this.setState({addNewFamLangBtnLabel:'Add'});
      }
  }


  showFamLangPopUp = () => {
    this.setState({addNewFamLang:true,isBlurred:'selector-blurred'});
  }

  closeNewFamLangPopUp = () => {
    if (this.state.addNewFamLang) {
      this.setState({addNewFamLang:false,isBlurred:''});
    }
  }

  saveNotes = (e) => {
    this.setState({btnLabel:'Saved',btnState:'updateNotesBtn-leave'},() => {
        MeActions.saveNotes(e);
      });
    const x = this;
    setTimeout(() => {
      x.setState({btnLabel:'Save notes',btnState: 'updateNotesBtn-appear'});
    },2000);
  }



  showInterestsList = () => {
    this.setState({showList:true,isBlurred:'selector-blurred'});
  }

  closeInterestsList = () => {
    if (this.state.showList) {
      this.setState({showList:false,isBlurred:''});
    }
  }

  render () {


    const selectors = ['info','chatting','heart'].map((selector, index) => {
      const source = `userProfile/${selector}.png`;
      return (
        <img key={index} src = {source} className='selector' onClick = {() => this.changeSelector(index)}/>
      );
    });



    const infoSelector = (
      <div className = 'genericSelectorWrap'>
        <h1 className = 'selectorHeader'>Information</h1>
        {this.state.showEdit && <p className = 'editPromptLabel'>Edit</p>}
        <div  className='nameWrap'>
          <p className = 'propLabel' id = 'nameLabel'>Name</p>
          <p className = 'dataLabel' id = 'nameData'>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</p>
        </div>
        <div className='ageWrap'>
          <p className = 'propLabel' id = 'ageLabel' >Age</p>
          <p className = 'dataLabel' id = 'ageData'>{this.state.userInfo.age}</p>
        </div>
      </div>
    );

    const familiarLanguages = this.state.userInfo.familiarLanguages.map((lang,index) => {
      return (
        <MenuItem
          value = {lang.name}
          key={index}
          primaryText={lang.name}
        />
      )
    });

    const languageLevels = () => {

      for (var lang of this.state.userInfo.familiarLanguages) {
        if (this.state.famLanguage===lang.name) {

          return (
            <LanguageLevel
              value={lang.level}
              className = 'famLangLevel'
            />
          )
        }
      }
    }

    const newFamLangBox = (
      <Paper className = 'newFamLangContainer' >
        <AutoComplete
           hintText = "Language"
           searchText={this.state.newFamLangInput}
           dataSource={this.state.allLanguages}
           onUpdateInput= {(e) => this.updateNewFamLanguage(e)}
           className = 'newFamLangsList'
         />
         <span  className = "newFamLangLangLevel">
         <LanguageLevel
          value = {this.state.newFamLangLevel}
          onChange = {MeActions.updateNewFamLangLevel}
         />
       </span>
         <FlatButton className = "newFamLangAddBtn" onClick = {this.addNewFamLang}>
           {this.state.addNewFamLangBtnLabel}
         </FlatButton>
      </Paper>
    )


    const languagesSelector = (
      <div className = 'genericSelectorWrap' >
        <div id = "popUpnewFamLangBox">
          {this.state.addNewFamLang && newFamLangBox }
        </div>
        <div id = {this.state.isBlurred} onClick = {this.closeNewFamLangPopUp}>
          <h1 className = 'selectorHeader'>Languages</h1>
          {this.state.showEdit && <p className = 'editPromptLabel' onClick = {this.enableEdit}>Edit</p>}
          <div className = 'motherLanguageWrap' >
            <p className = 'propLabel' id ='motherLangLabel'>Mother language</p>
            {
              this.state.enableEdit ? <div id = 'motherLanguaeEdit'><TextField className = 'data motherLangInputEdit' value = {this.state.updatingMotherLang || this.state.userInfo.motherLanguage} onChange = {(e) => MeActions.updateMotherLanguage(e)}/></div> : <p className = 'dataLabel' id = 'motherLangDataLabel'>{this.state.userInfo.motherLanguage}</p>
            }
          </div>
          <div className = 'famLangWrapper'>
            <p className = 'propLabel' id = 'famLangLabel'>Familiar languages</p>
            <div>
              <p className = 'langLevelLabels' id = 'langLabel'>Language</p>
              <p className = 'langLevelLabels' id = 'levelLabel'>Level</p>
            </div>
            <div className = 'famLangListWrap'>
              <SelectField
                value = {this.state.famLanguage}
                onChange = {this.selectFamLang}
                className = 'famLangList'
                labelStyle = {{fontFamily: '"Dosis", sans-serif',
                  fontSize: '25px',float:'left'}}
              >
                {familiarLanguages}
              </SelectField>
              {languageLevels()}
            </div>
            <span>
              <FlatButton
                onClick = {this.showFamLangPopUp}
                id = "addNewFamLangBtn"
                backgroundColor="#4e8e48"
                hoverColor="#57ad4f"
                >
                Add more
              </FlatButton>
            </span>
          </div>
        </div>

      </div>
    )

    const notes = (
        <div className = "choiceNotesWrap">
          <Paper
            className='interestNotesWrap'>
          <img src = {`./png/${(this.state.addNotes || {}).icon}.png`} className = 'notesInterestIcon'/>
          <div>
            <p className = 'interestLabel notesInterestLabel'>{(this.state.addNotes || {}).label}</p>
          </div>
          <span><img className = 'chosenInterestNotes' src='./notes-selected.png'/></span>
          </Paper>
          <span id = "notesBubbleWrap"> <img src='./notesBubble.png' id='notesBubbleIcon' onClick = {this.closeNotes}/>

            <TextField
              hintText={`Share something about ${(this.state.addNotes || {}).label}`}
              value = {this.state.updatingNotes || (this.state.addNotes || {}).notes}
              onChange = {(e) => MeActions.updateNotesField(e)}
              multiLine = {true}
              rowsMax = {5}
              className = 'notesInputFieldUserProfile'
            />

            {(this.state.addNotes || {}).notes !== this.state.updatingNotes && <FlatButton className = "updateNotesBtn" id = {this.state.btnState} onClick = {(e) => this.saveNotes(e)}>{this.state.btnLabel}</FlatButton>}
          </span>
        </div>
    )

    const decorators = [{
        component: React.createClass({
          render() {
            return (
              <i className="material-icons" id = 'prevArrow' onClick={this.props.previousSlide}>&#xE314;</i>
            )
          }
        }),
        position: 'CenterLeft'
      },
      {
        component: React.createClass({
          render() {
            return (
              <i className="material-icons" id = 'nextArrow' onClick={this.props.nextSlide}>keyboard_arrow_right</i>
            )
          }
        }),
        position: 'CenterRight'
      }
    ];



    const interests = this.state.userInfo.interests.map((hobby,index) => {
        const source = `./png/${hobby.icon}.png`;
        return (
          <Paper className = 'interestCardWrap'>
            <Paper className = 'cardHeaderWrap'>
              <img src = {source} className = 'interestCardIcon'/>
            </Paper>

            <span className = 'circleNotesWrap' onClick = {() => this.addNotes(hobby,index)}><img src = 'notes.png' className = 'circleNotesIcon'/></span>

            <Paper className = 'cardFooterWrap'>
              <p className = 'cardLabel'>{hobby.label}</p>
            </Paper>

          </Paper>
        )
    });

    const plusSign = (
      <Paper className = "addInterestWrap" onClick = {this.showInterestsList}>
        <span>
          <img src = "./png/add.png" className = "interestCardIcon"/>
        </span>
        <p id = "addInterestLabel">Add more</p>
      </Paper>
    )
    interests.push(plusSign);


    const listContent = this.state.allInterests.map((interest) => {
      const source = `./png/${interest.icon}.png`;
      let isSelected = null;
      const checked = [];
      this.state.userInfo.interests.forEach((userInterest) => {
        if (!checked.includes(interest)) {
          if (userInterest.label === interest.label) {
            interest.state = 'selected';
            checked.push(interest);
          }
          else {
            interest.state = 'unselected';
          }
        }
      });
      return (
        <ListItem id = "singleInterestContainer" onClick = {() => MeActions.addInterest(interest)}>
            <Avatar id = "interestAvatarIcon" src = {source}/>
            <p id = "interestListLabel">{interest.label}</p>

            <p className = "heartIcon" id = {`interest-${interest.state}`} >❤</p>

        </ListItem>
      )
    });

    const interestsList = (
        <Paper id = "listContainer">
          <List id = "interestsContainer">
            <Infinite containerHeight={280} elementHeight={60}>
              {listContent}
            </Infinite>
          </List>
        </Paper>
    )


    const interestsSelector = (
      <div className = 'genericSelectorWrap'>
        <span id = "popupList">
          {this.state.showList && interestsList}
        </span>
        <div id = {this.state.isBlurred} onClick = {this.closeInterestsList} >
          <div  id = {this.state.visibilityHeader}>
            <h1 className = 'selectorHeader'>Interests</h1>
          </div>
            <div className = 'notesField'>
              {this.state.addNotes != null && notes}
            </div>
            <div className = "choicesWrap">
              {this.state.addNotes == null &&
                <CustomCarousel
                slideIndex = {this.state.carouselIndex}
                slidesToShow = {1}
                decorators = {decorators}
                className = 'userInterestsCarouselWrap'
                content={interests}
              />}
            </div>
        </div>
      </div>
    )





    return (
      <div className = "userProfileWrap">
        <img src='./boss.png' className='profileImg'/>
        <MuiThemeProvider>
          <Paper className="userInfoWrap" zDepth={1}>
            <div className = "selectorsWrap" >
              <MuiThemeProvider>
                <Paper className="selectorsContainer" zDepth={1} >
                  {selectors}
                </Paper>
              </MuiThemeProvider>
            </div>
            <div className="selectorDataWrap" onMouseEnter = {this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}>
              <span className='backgroundSelector' id={this.state.selectorBg}/>
              <MuiThemeProvider>
                <Paper className="selectorDataContainer" >
                  {this.state.selectorBg === 'bg-info' && infoSelector}
                  {this.state.selectorBg === 'bg-languages' && languagesSelector}
                  {this.state.selectorBg === 'bg-interests' && interestsSelector}
                </Paper>
              </MuiThemeProvider>
            </div>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default User;
