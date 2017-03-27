import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import '../../styles/Onboarding/InterestsNotes.scss';
import CustomCarousel from './CustomCarousel';
import OnboardingActions from '../../actions/OnboardingActions';
import OnboardingStore from '../../stores/OnboardingStore';


class IneterestsNotes extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = OnboardingStore;
    this.state = { showNotes: false, selectedInterest: null, saveNotesBtnClass: 'saveNotesBtn', howSaveNotesBtn: false, notesSavedLabel: 'Save notes' };
  }


  showBtn(e) {
    this.setState({ notesInputValue: e.target.value });
    if (e.target.value.length > 1) {
      this.setState({ showSaveNotesBtn: true, notesInput: e.target.value });
    }else {
      this.setState({showSaveNotesBtn : false});
    }
  }

  selectInterest(hobby) {
    this.setState({toAddNotes:hobby});
  }

  saveNotes() {
    OnboardingActions.saveNotes();
    this.setState({ notesSavedLabel: 'Notes saved', notesSavedIcon: 'done', notesSavedBtnColor: '#1f9b4e', notesInputValue: '' });
    const self = this;
    setTimeout(() => { self.setState({ saveNotesBtnClass: 'saveNotesBtn saveNotesBtn-saved' }); }, 600);
    setTimeout(() => { self.setState({ showSaveNotesBtn: false, saveNotesBtnClass: 'saveNotesBtn', notesSavedIcon: '', notesSavedBtnColor: '', notesSavedLabel: 'Save notes' }); }, 1000);
  }

  render() {
    const label = {
      fontSize: '30px',
      position: 'relative',
      paddingTop: '50px',
      color: '#545454',
      fontFamily: "'Abel', sans-serif",
    };

    // Container for all the interests that the user has chosen
    const chosenInterests = this.state.userInfo.interests.map((hobby) => {
      const source = `/png/${hobby.icon}.png`;
      console.log(`${hobby.label} === ${this.state.toAddNotes.label}`);
      return (
        <span>
          <Avatar src={require(`../../../public${source}`)} className={hobby.label === this.state.toAddNotes.label ? 'singleInterest singleInterest-selected' : 'singleInterest'} onClick={() => this.selectInterest(hobby)} />
        </span>
      );
    });

    const saveNotesBtn = (
      <RaisedButton
        label={this.state.notesSavedLabel}
        backgroundColor={this.state.notesSavedBtnColor}
        className={this.state.saveNotesBtnClass}
        icon={<i className="material-icons">{this.state.notesSavedIcon}</i>}
        onClick={() => this.saveNotes()}
      />
    );


    return (
      <div className="notes">
        <div style={label}> Tell us a bit more</div>
        <i
          className="material-icons"
          style={{
            fontSize: '40px',
            marginTop: '5px',
            color: '#1d5e5b' }}
        >
          speaker_notes
        </i>

        <p id="picksLabel"> Your picks </p>

        <div className="picksWrap">
          <div id="dividerHor" />

          <CustomCarousel
            slideWidth={1}
            slidesToShow={3}
            content={chosenInterests}
          />
          <div id="dividerHor2" />
        </div>
        <div className="notesFieldWrap">
          <MuiThemeProvider>
            <Paper className="notesFieldContainer" zDepth={1}>
              <span>
                <img src={require('../../../public/notesColor.png')} className="notesDisplayIcon" />
                <p id="toAddNotesLabel">Share something connected to <span id="toAddNotesInterest">{(this.state.toAddNotes || {}).label.toLowerCase()}</span></p>
              </span>
              <TextField
                hintText={'Add you story here'}
                value={this.state.notesInputValue}
                multiLine
                onChange={e => this.showBtn(e)}
                onBlur={e => OnboardingActions.updateNotes(e)}
                rows={1}
                rowsMax={4}
                className="notesInput"
              />
            </Paper>
          </MuiThemeProvider>
          {this.state.showSaveNotesBtn && saveNotesBtn}

        </div>
      </div>
    );
  }

}

export default IneterestsNotes;
