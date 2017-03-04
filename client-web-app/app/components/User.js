import React from 'react';
import Reflux from 'reflux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import Paper from '../node_modules/material-ui/Paper';
import SelectField from '../node_modules/material-ui/SelectField';
import Avatar from '../node_modules/material-ui/Avatar';
import MenuItem  from '../node_modules/material-ui/MenuItem';
import LanguageLevel from './LanguageLevel';
import './User.css';

class User extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.famLangArr = [{name:'English',level:'A2'},{name:'Spanish',level:'B1'},{name:'Bulgarian',level:'C2'},{name:'Russian',level:'B2'}];
    this.state = {selectorBg:'bg-info',famLanguage:'English'};
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
        this.setState({selectorBg:'bg-interests'})
        break;
      default:
        console.log(idx);
        this.setState({selectorBg:'bg-info'})
        break;
    }
  };

  selectFamLang = (event,index,value) => {
    this.setState({famLanguage:value});
  }

  addNotes = (hobby) => {
    this.setState({addNotes:hobby});
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
        <div  className='nameWrap'>
          <p className = 'propLabel' id = 'nameLabel' onMouseEnter={()=>console.log('sese')} >Name</p>
          <p className = 'dataLabel' id = 'nameData'>Radoslav Naydenov</p>
        </div>
        <div className='ageWrap'>
          <p className = 'propLabel' id = 'ageLabel' >Age</p>
          <p className = 'dataLabel' id = 'ageData'>20</p>
        </div>
      </div>
    );

    const familiarLanguages = this.famLangArr.map((lang,index) => {
      return (
        <MenuItem
          value = {lang.name}
          key={index}
          primaryText={lang.name}
        />
      )
    });

    const languageLevels = () => {

      for (var lang of this.famLangArr) {
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


    const languagesSelector = (
      <div className = 'genericSelectorWrap'>
        <div className = 'motherLanguageWrap' >
          <p className = 'propLabel' id ='motherLangLabel'>Mother language</p>
          <p className = 'dataLabel' id = 'motherLangDataLabel'>Bulgarian</p>
        </div>
        <div>
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
        </div>

      </div>
    )

    const notes = (
      <div className = 'genericSelectorWrap'>
        <div>
          <Paper
            className='interestNotesWrap'>
          <Avatar src = './png/airplane.png' className = 'notesInterestIcon'/>
          <div>
            <p className = 'interestLabel notesInterestLabel'>Travelling</p>
          </div>
          <span><img className = 'chosenInterestNotes' src='./notes-selected.png'/></span>
          </Paper>
          <span > <img src='./notesBubble.png' id='notesBubbleIcon'/></span>
        </div>
      </div>
    )

    const interests = [{icon:'airplane',name:'Travelling'},{icon:'books',name:'Reading'},{icon:'diamond',name:'Fashion'},{icon:'gamepad',name:'Video Games'}].map((hobby,index) => {
      const source = `./png/${hobby.icon}.png`;
      return (
        <div className = 'interestsListWrap' key={index}>
          <Avatar src = {source} className = 'interestCircleIcon'/>
            <div>
              <p className = 'interestLabel'>{hobby.name}</p>
            </div>
            <span><img className = 'notesIcon' onClick = {() => this.addNotes({hobby})} src='./notes.png'/></span>
        </div>
      )
    });

    const interestsSelector = (
      <div>
        <div className = 'notesField'>
          {this.state.addNotes != null && notes}
        </div>
        <div className = 'genericSelectorWrap'>
          {interests}
        </div>
      </div>
    )

    return (
      <div className = "userProfileWrap">
        <img src='./boss.png' className='profileImg'/>
        <MuiThemeProvider>
          <Paper className="userInfoWrap" zDepth={1}>
            <div className = "selectorsWrap">
              <MuiThemeProvider>
                <Paper className="selectorsContainer" zDepth={1}>
                  {selectors}
                </Paper>
              </MuiThemeProvider>
            </div>
            <div className="selectorDataWrap">
              <span className='backgroundSelector' id={this.state.selectorBg}/>
              <MuiThemeProvider>
                <Paper className="selectorDataContainer">
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
