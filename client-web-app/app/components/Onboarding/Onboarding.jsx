import React from 'react';
import Reflux from 'reflux';
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import NextButton from './NextButton';
import FinishButton from './FinishButton';
import LanguagesForm from './LanguagesForm';
import Interests from './Interests';
import DetailsForm from './DetailsForm';
import InterestsNotes from './InterestsNotes';
import OnboardingActions from '../../actions/OnboardingActions';
import OnboardingStore from '../../stores/OnboardingStore';
import Auth from '../../stores/auth';
import actions from '../../actions/actions';
import '../../styles/Onboarding/Onboarding.scss';


class Onboarding extends Reflux.Component {

  constructor(props) {
    super(props);
    this.state = { errorBubble: 'errorMsgInfoWrap' };
    this.stores = [OnboardingStore, Auth];
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.onboardingFinishStatus !== this.state.onboardingFinishStatus
      && this.state.onboardingFinishStatus === 'ok') {
      hashHistory.push('/');
    }
  }

  finish() {
    const { userInfo, me } = this.state;
    OnboardingActions.finish(userInfo, me._id);
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      actions.meFromToken(jwt);
    }
  }

  renderOnboarding() {
    const { onboardingFinishStatus } = this.state;
    if (onboardingFinishStatus === null || onboardingFinishStatus === 'ok') return;
    window.alert('Something went wrong. Sorry :(');
  }

  render() {
    const userInfoError = (
      <div className={this.state.langErrorWrap}>
        <img src={require('../../../public/errorMsgBubble.png')} id="errorUserInfoIcon" />
        <p id="errorUserInfoText">Please fill in all the required fields</p>
      </div>
    );

    const motherLangError = (
      <div className={this.state.langErrorWrap}>
        <img src={require('../../../public/errorMsgBubble.png')} id="errorMotherLangIcon" />
        <p id="errorMotherLangText">Please enter your mother language</p>
      </div>
    );

    const famLangError = (
      <div className={this.state.langErrorWrap}>
        <img src={require('../../../public/errorMsgBubble.png')} id="errorFamLangIcon" />
        <p id="errorFamLangText">Please specify the languages you <br /> want to practice</p>
      </div>
    );


    const interestsError = (
      <div className={this.state.langErrorWrap}>
        <img src={require('../../../public/errorMsgBubble.png')} id="errorInterestsIcon" />
        <p id="errorInterestsText">Please choose at least 3 topics</p>
      </div>
    );

    return (
      <div className="mainWrap">
        {this.renderOnboarding()}
        <MuiThemeProvider>
          <Paper className="basicContainer" zDepth={1}>
            {this.state.stage === 'userInfoStage' && <DetailsForm />}
            {this.state.stage === 'languagesStage' && <LanguagesForm />}
            {this.state.stage === 'interestsStage' && <Interests />}
            {this.state.stage === 'interestsNotesStage' && <InterestsNotes />}
            {this.state.userInfoError && userInfoError}
            {this.state.motherLangError && motherLangError}
            {this.state.famLangError && famLangError}
            {this.state.interestsError && interestsError}
          </Paper>
        </MuiThemeProvider>
        <div className="ctrlBtns">
          {this.state.stage !== 'interestsNotesStage' && <NextButton onClick={() => OnboardingActions.goNext()} />}
          {this.state.stage === 'interestsNotesStage' && <FinishButton onClick={() => this.finish()} />}
        </div>
      </div>
    );
  }
}

export default Onboarding;