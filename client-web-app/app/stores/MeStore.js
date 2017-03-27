import Reflux from 'reflux';
import MeActions from '../actions/MeActions';
import actions from '../actions/actions';


class MeStore extends Reflux.Store {

  constructor(props) {
    super(props);

    this.listenables = MeActions;
    this.listenTo(actions.meFromToken);
    this.state = {};
  }

  updateMotherLanguage(e) {
    this.setState({ updatingMotherLang: e.target.value });
  }

  updateNewFamLanguage(input) {
    this.setState({
      newFamLangInput: input, famLangToAdd: { ...this.state.famLangToAdd, name: input },
    });
  }

  updateNewFamLangLevel(event, index, value) {
    if (value !== 'Level') {
      this.setState({
        newFamLangLevel: value, famLangToAdd: { ...this.state.famLangToAdd, level: value },
      });
    }
  }

  addNewFamLang() {
    const userLangs = this.state.userInfo.familiarLanguages;
    userLangs.push(this.state.famLangToAdd);
    this.setState({ userInfo: { ...this.state.userInfo, familiarLanguages: userLangs }, famLangToAdd: null, newFamLangLevel: 'Level', newFamLangInput: '' });
  }

  selectHobby(hobby) {
    this.setState({ selectedHobby: hobby, updatingNotes: hobby.notes });
  }

  updateNotesField(e) {
    this.setState({ updatingNotes: e.target.value });
  }

  saveNotes() {
    this.state.selectedHobby.notes = this.state.updatingNotes;
  }

  addInterest(interest) {
    const interestsState = this.state.userInfo.interests;
    if (interest.state === 'selected') {
      interest.state = 'unselected';    //eslint-disable-line
        // TODO This is not working now as the interest objects are not the same
      const idx = interestsState.indexOf(interest);
      interestsState.splice(idx, 1);
    } else {
      interest.state = 'selected';  //eslint-disable-line
      interestsState.push(interest);
    }
    this.setState({ userInfo: { ...this.state.userInfo, interests: interestsState } });
  }


}

export default MeStore;
