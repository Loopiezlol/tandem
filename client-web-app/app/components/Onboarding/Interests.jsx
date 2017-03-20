import React from 'react';
import Reflux from 'reflux';
import OnboardingActions from '../../actions/OnboardingActions';
import OnboardingStore from '../../stores/OnboardingStore';
import '../../styles/Onboarding/Interests.scss';


class Ineterests extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = OnboardingStore;
    this.state = { showNotes: false, expandNotes: false };
  }


  // If more than 3 interests have been selected
  // go to the next section of the onboarding process
  goToNotes() {
    if (this.state.chosenInterests.length >= 3) {
      this.setState({ showNotes: true });
    }
  }

  // Return to the interests section
  goBack() {
    if (this.state.showNotes) {
      this.setState({ showNotes: false });
    }
  }


  expandNotes(index) {
    const interest = this.state.chosenInterests[index].label;
    this.setState({ toAddNotes: interest });
  }

  render() {
    const label = {
      fontSize: '30px',
      position: 'relative',
      paddingTop: '50px',
      color: '#545454',
      fontFamily: "'Abel', sans-serif",
    };


    // Container for all the available interests
    const hobbies = this.state.interests.map((hobby) => {
      const source = `/png/${hobby.icon}.png`;
      return (
        <div className="iconsWrap" onTouchTap={this.openDescModal}>
          <img className="interestsIcons" src={require(`../../../public${source}`)} />
          <p className="hobbyLabel">{hobby.label}</p>
          <div className={hobby.state} onClick={() => OnboardingActions.selectInterest(hobby)} />
        </div>
      );
    });


    return (
      <div className="transitionComponent">
        <div style={label} >What do you love?</div>
        <i
          className="material-icons"
          style={{
            fontSize: '40px',
            marginTop: '5px',
            color: '#7c3131' }}
        >
          favorite
        </i>
        <p className="promptLabel">Pick at least 3 topics that are of interest to you</p>
        <div>
          {hobbies}
        </div>
      </div>
    );
  }

}

export default Ineterests;
