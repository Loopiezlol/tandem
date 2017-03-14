import React from 'react';
import Reflux from 'reflux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import LanguageLevel from './LanguageLevel';
import OnboardingActions from '../../actions/OnboardingActions';
import OnboardingStore from '../../stores/OnboardingStore';
import '../../styles/Onboarding/LanguagesForm.scss';

class LanguagesForm extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = OnboardingStore;
    this.state = {
      greetUser: true,
      askLanguages: false,
      inputContainer: 'inputContainer',
      bubbleState: 'speechBubbleGreeting',
      bubbleSrc: './speechBubbleGreeting.png',
      inputFieldState: 'inputMotherLangField',
      okBtn: 'okBtn',
      languageAddedLabel: 'languageAddedLabel',
      langErrorWrap: 'languagesErrorWrap-appear',
      showInstruction: false,
      enableInputField: false,
    };
  }


  // Event listener to show button if mother language is provided
  showOkBtn(input) {
    OnboardingActions.updateLanguage(input);
    // If input is more than 5 characters long, show the button
    if (!this.state.askLanguages && input.length > 5) {
      this.setState({ okBtn: 'okBtn okBtn-show' });
    }
  }

  // Event, which prompts the user to
  // add the languages he/she is familiar with
  askLanguages() {
    OnboardingActions.addLanguage();
    const x = this;
    function changeState() {
      x.setState({
        inputContainer: 'inputContainer inputContainer-expanded',
        bubbleSrc: './speechBubbleLanguages.png',
        bubbleState: 'speechBubbleLanguages',
        askLanguages: true,
        okBtn: 'okBtn',
        enableInputField: true,
      });
    }

    this.setState({
      bubbleState: 'speechBubbleGreeting bubbleLeave',
      inputFieldState: 'inputMotherLangField inputFieldExit',
      greetUser: false,
    }, () => {
      setTimeout(changeState, 1000);
    });
  }

  // Add a language the user is familiar with the list
  addLanguage() {
    console.log(this);
    const userInfoState = this.state.userInfo;
    const stateLangList = userInfoState.familiarLanguages;
    const newLang = this.state.currLang;
    const x = this;


    // Check if language is already in list of familiar languages
    function isLanguageAdded(newFamLang) {
      let toReturn = false;
      stateLangList.forEach((lang) => {
        if (lang.name === newFamLang) {
          toReturn = true;
        }
      });
      return toReturn;
    }

    function changeState() {
      x.setState({ bubbleSrc: './speechBubbleGreeting.png', bubbleState: 'speechBubbleInstruction' });
    }


    if (newLang == null || newLang === '') {
      this.setState({ validLangError: true });
      setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-leave' }); }, 3000);
      setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-appear', validLangError: false }); }, 3400);
    } else if (this.state.langLevel === 'Level' || this.state.langLevel == null) {
      this.setState({ langLevelError: true });
      setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-leave' }); }, 3000);
      setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-appear', langLevelError: false }); }, 3400);
    } else if (isLanguageAdded(newLang)) {
      this.setState({ addedLangError: true });
      setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-leave' }); }, 3000);
      setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-appear', addedLangError: false }); }, 3400);
    } else {
      OnboardingActions.addLanguage();
      this.setState({ currLang: '', famLangInput: '', langLevel: 'Level', languageAddedLabel: 'languageAddedLabel languageAddedLabel-finished' });
      setTimeout(() => { x.setState({ languageAddedLabel: 'languageAddedLabel' }); }, 2000);


      if (stateLangList.length === 1) {
        this.setState({ askLanguages: false, showInstruction: true });
      }

      if (stateLangList.length === 1 && !this.state.showInstruction) {
        this.setState({ bubbleState: 'speechBubbleLanguages bubbleLeave' }, () => {
          setTimeout(changeState, 1000);
        });
      }
    }
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

    // Greeting message to be put inside speech bubble
    const greeting = (
      <div className="labelWrap">
        <p id="greeting"><span id="hiLabel">Hi.</span> <br /> What&#39;s your mother language?</p>
      </div>
    );

    // Input text field that prompts
    // user to enter his/her mother language
    const motherLanguage = (
      <AutoComplete
        dataSource={this.state.allLanguages}
        hintText="E.g Italian"
        hintStyle={{ marginLeft: '20px', fontSize: '20px' }}
        className={this.state.inputFieldState}
        inputStyle={{ fontSize: '35px', fontFamily: "'Questrial', sans-serif" }}
        underlineShow={false}
        onUpdateInput={e => this.showOkBtn(e)}
      />
    );

    // Container for adding the familiar languages
    // with the corresponding competency level
    const familiarLanguages = (
      <div className="familiarLanguagesWrap">

        <AutoComplete
          hintText="Language"
          searchText={this.state.currLang}
          dataSource={this.state.allLanguages}
          onUpdateInput={e => OnboardingActions.updateLanguage(e)}
          className="inputFamLangField"
        />

        <span>
          <p className={this.state.languageAddedLabel}>Language added </p>
        </span>
        <span >
          <LanguageLevel
            value={this.state.langLevel}
            className="levelSelector"
            onChange={OnboardingActions.changeLangLevel}
          />
        </span>

        <FlatButton
          backgroundColor="#00796B"
          hoverColor="#009688"
          label="Add"
          labelStyle={{ color: 'white' }}
          className="addLangBtn"
          onClick={() => this.addLanguage()}
        />
      </div>
    );

    // Message prompting the user to add other languages
    // he/she is familiar with
    const askLanguage = (
      <div className="labelWrap">
        <p id="languagesQuery">What other languages are you familiar with?</p>
      </div>
    );


    const langLevelError = (
      <div className={this.state.langErrorWrap}>
        <img src="errorMsgBubble-rotated.png" className="errorBubbleLanguages" id="langLevelErrorIcon" />
        <p className="errorTextLanguages" id="langLevelErrorText">Please specify level of competency</p>
      </div>
    );

    const addedLangError = (
      <div className={this.state.langErrorWrap}>
        <img src="errorMsgBubble-rotated.png" className="errorBubbleLanguages" id="addedLangErrorIcon" />
        <p className="errorTextLanguages" id="addedLangErrorText">{this.state.currLang} is already added</p>
      </div>
    );

    const validLangError = (
      <div className={this.state.langErrorWrap}>
        <img src="errorMsgBubble-rotated.png" className="errorBubbleLanguages" id="addedLangErrorIcon" />
        <p className="errorTextLanguages" id="validLangErrorText">Please enter a valid language</p>
      </div>
    );


    // Message which instructs user to add more languages or
    // continue with the onboarding process
    const instruction = (
      <div className="labelWrap">
        <p id="instruction"><span id="languageLabel">{(this.state.userInfo.familiarLanguages[0] || {}).name}!</span> <br />That&#39;s great. <br />
          Add more languages <br /> or click <span id="nextLabel">Next</span> to continue. </p>
      </div>
    );


    return (
      <div className="transitionComponent">
        <div style={label}>Let&#39;s connect!</div>
        <div>
          <i
            className="material-icons smileyIcon"
          >sentiment_very_satisfied</i>

        </div>

        <div>
          <span><img className={this.state.bubbleState} src={this.state.bubbleSrc} /></span>
        </div>
        {this.state.greetUser && greeting}
        {this.state.askLanguages && askLanguage}
        {this.state.showInstruction && instruction}

        <MuiThemeProvider>
          <div className="inputWrap ">

            <FlatButton
              backgroundColor="#3f577c"
              hoverColor="#496796"
              label="OK"
              labelStyle={{ color: 'white' }}
              className={this.state.okBtn}
              onClick={() => this.askLanguages()}
            />

            <Paper className={this.state.inputContainer}>
              {this.state.greetUser && motherLanguage}
              {this.state.enableInputField && familiarLanguages}
              <span>
                {this.state.langLevelError && langLevelError}

                {this.state.addedLangError && addedLangError}

                {this.state.validLangError && validLangError}
              </span>
            </Paper>


          </div>
        </MuiThemeProvider>

      </div>
    );
  }

}

export default LanguagesForm;
