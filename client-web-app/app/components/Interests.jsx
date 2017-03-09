import React from 'react';
import Reflux from 'reflux';
import './Interests.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import FlatButton from '../node_modules/material-ui/FlatButton';
import BasicContainer from './BasicContainer';
import Dialog from '../node_modules/material-ui/Dialog';
import TextField from '../node_modules/material-ui/TextField';
import {List, ListItem} from '../node_modules/material-ui/List';
import Avatar from "../node_modules/material-ui/Avatar";
import OnboardingActions from './actions/OnboardingActions';
import OnboardingStore from './stores/OnboardingStore';




class Ineterests extends Reflux.Component {

  constructor (props) {
    super(props);
    this.store = OnboardingStore;
    this.state = {showNotes:false,expandNotes:false};
  }


  // If more than 3 interests have been selected
  // go to the next section of the onboarding process
  goToNotes = () => {
    if(this.state.chosenInterests.length >= 3) {
      this.setState({showNotes:true});
      console.log(this.state.showNotes);
    }
  }

  // Return to the interests section
  goBack = () => {
    if(this.state.showNotes) {
      this.setState({showNotes:false});
    }
  }


  expandNotes = (index) => {
     const interest = this.state.chosenInterests[index].label;
     this.setState({toAddNotes:interest})
  }

  render() {

    const label = {
      fontSize: '30px',
      position:"relative",
      paddingTop: '50px',
      color: '#545454',
      fontFamily: "'Abel', sans-serif"
    }



    // Container for all the available interests
    const hobbies = this.state.interests.map((hobby, index) => {
        const source = `./png/${hobby.icon}.png`;
        let classSelector = 'selector';
        if (hobby.isClicked) {
          classSelector='selector-click';
        }
        return (
            <div key={index} className = "iconsWrap" onTouchTap={this.openDescModal}>
                 <img className="interestsIcons"  src={source}/>
                 <p className="hobbyLabel">{hobby.label}</p>
                 <div className = {hobby.state} onClick = {() => OnboardingActions.selectInterest(hobby)}></div>
            </div>
        );
    });


    return (
      <div>
        <div style = {label} >What do you love?</div>
        <i className="material-icons"
           style={{
           fontSize:'40px',
           marginTop:'5px',
           color: '#7c3131'}}>
          favorite
        </i>
        <p className="promptLabel">Pick at least 3 topics that are of interest to you</p>
        <div>
          {hobbies}
        </div>
      </div>
    )
  }

}

export default Ineterests;
