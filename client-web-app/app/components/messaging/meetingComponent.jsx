import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import ReactEmoji from 'react-emoji';
import Carousel from 'nuka-carousel';
import SBStore from '../../stores/sbStore';
import '../../styles/sbChat.scss';

// The component rendered to show guided meeting tips in chat

const meetIcon = <FontIcon className="material-icons">people</FontIcon>;
const tipsIcon = <FontIcon className="material-icons">&#xE8DC;</FontIcon>;
const nextIcon = <FontIcon className="material-icons" id="nextTipLabel">&#xE409;</FontIcon>;

class meetingComponent extends Reflux.Component {


  state = {
    stepIndex: 0,
  };

  handleNextStep = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrevStep = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  constructor(props) {
    super(props);
    const meetingInfo = [
      {
        label: 'Stay on Schedule',
        part1: `You should definitely have some time to get to know each other, and have friendly conversation
      in your mutual, best language.`,
        important: 'But then, get down to business.',
        part2:
       `Set up a reasonable schedule: 30 minutes in the language you’re trying to learn,
        30 minutes in English
       (or whatever language your partner wants to learn) is a common and great way to divide the time.`,
        color: '#5088b3' },
      { label: 'Meet Regularly',
        desc:
       `The longer you wait between meetings, the less likely you are to remember what you learned.
       Try meeting once per week or once in every two weeks as a bare minimum.`,
        color: '#b34f4f',
      },
      { label: 'Don’t Be Afraid to Make Mistakes',
        question1: 'Can\'t think of a word?',
        part1: 'Try to describe it using the language you’re learning.',
        question2: 'Your partner doesn’t understand you?',
        part2: 'Try speaking it out slowly.',
        color: '#4da95e',
      },
      { label: 'Practice Between Meetups',
        desc:
       `It's handy to have a notebook :closed_book: with you and
       jotting down any difficulties you’re having or new words you’re learning. Then
       practice whatever you found most difficult.`,
        color: '#ca8648',
      },

    ];
    this.state = {
      stepIndex: 0,
      showInitButtons: true,
      showMeetingStepper: false,
      tips: meetingInfo,
      tipsIdx: 0,
    };
    console.log(this.state.tips);
    this.store = SBStore;
  }

  renderStepButtons(step) {
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label="Next"
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple
            disableFocusRipple
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  renderMeetingStepper() {
    const { stepIndex } = this.state;
    return (
      <Paper style={{ boxShadow: 'none' }}>
        <h2>Starting a Meeting</h2>
        <p />
        <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
              Step 1:
            </StepButton>
              <StepContent>
                <p>
                Introduce yourselves or something.
              </p>
                {this.renderStepButtons(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
              Step 2:
            </StepButton>
              <StepContent>
                <p>Define what you guys want from the session mutually. Make a clear set of goals.
              </p>
                {this.renderStepButtons(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
              Step 3:
            </StepButton>
              <StepContent>
                <p>
                Decide which language to practice first and start some learning m8
              </p>
                {this.renderStepButtons(2)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </Paper>
    );
  }

  renderInitButtons() {
    return (
      <div>
        <h2>Ready to start a Meeting?</h2>
        <RaisedButton
          label="Start a Meeting" secondary style={{ margin: 12 }} icon={meetIcon}
          onClick={() => this.handleStartMeeting()}
        />
        <RaisedButton label="Tips " style={{ margin: 12 }} icon={tipsIcon} onClick={() => this.openTips()} />
      </div>
    );
  }

  openTips() {
    this.setState({ tipsSelected: true, showMeetingStepper: false, selectedTip : 'tipsSelected'});
  }

  goNextTip() {
    let nextTip;
    if (this.state.tipsIdx === this.state.tips.length - 1) {
      nextTip = 0;
    } else {
      nextTip = this.state.tipsIdx + 1;
    }
    this.setState({ tipAnimation: '' }, () => {
      setTimeout(() => {
        this.setState({ tipsIdx: nextTip, tipAnimation: 'tipWrap' });
      }, 0);
    });
  }

  render() {
    const tipsInfo = this.state.tips.map((tip) => {
      return (
        <div>
          <div className={this.state.tipAnimation}>
            <p id="tipsLabel" style={{ color: `${tip.color}` }}>{tip.label}</p>
            <p className="questionLabel">{(tip || {}).question1}</p>
            <p id="tipsDesc" >{tip.part1 || tip.desc}</p>
            <p className="importantLabel">{(tip || {}).important}</p>
            <p className="questionLabel">{(tip || {}).question2}</p>
            <p id="tipsDesc" >{(tip || {}).part2 }</p>
          </div>
          <RaisedButton
            icon={nextIcon}
            backgroundColor=" #4e5c72 "
            className="nextTipBtn"
            onClick={() => this.goNextTip()}
          >
            <span id="nextTipLabel">next tip</span>
          </RaisedButton>
        </div>

      );
    });


    const tips = (
      <Carousel
        decorators={null}
        className="tipsCarousel"
        slideIndex={this.state.tipsIdx}
        wrapAround
      >
        {tipsInfo}
      </Carousel>
    );

    return (
      <div>
        {this.state.showInitButtons && this.renderInitButtons()}
        {this.state.showMeetingStepper && this.renderMeetingStepper()}
        {this.state.tipsSelected && tips}
      </div>
    );
  }

  handleStartMeeting() {
    this.setState({
      showMeetingStepper: true,
    });
  }
}


export default meetingComponent;
