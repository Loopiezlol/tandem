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
import SBStore from '../../stores/sbStore';
import '../../styles/sbChat.scss';

// The component rendered to show guided meeting tips in chat

const meetIcon = <FontIcon className="material-icons">people</FontIcon>;

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
    this.state = {
      stepIndex: 0,
      showInitButtons: true,
      showMeetingStepper: false,
    };
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
        <RaisedButton label="View some info" style={{ margin: 12 }} icon={meetIcon} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.showInitButtons && this.renderInitButtons()}
        {this.state.showMeetingStepper && this.renderMeetingStepper()}
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
