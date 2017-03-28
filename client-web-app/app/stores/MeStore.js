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

  // Update mother language
  updateMotherLanguage(e) {
    this.setState({ updatingMotherLang: e.target.value });
  }

  // Update new language user has added as familiar
  updateNewFamLanguage(input) {
    this.setState({
      newFamLangInput: input, famLangToAdd: { ...this.state.famLangToAdd, name: input },
    });
  }

  // Update level of new language user has added as familiar
  updateNewFamLangLevel(event, index, value) {
    console.log(value);
    if (value !== 'Level') {
      this.setState({
        newFamLangLevel: value, famLangToAdd: { ...this.state.famLangToAdd, level: value },
      });
    }
  }

  // Add new language user is familiar with
  addNewFamLang() {
    const userLangs = this.state.userInfo.familiarLanguages;
    userLangs.push(this.state.famLangToAdd);
    this.setState({ userInfo: { ...this.state.userInfo, familiarLanguages: userLangs }, famLangToAdd: null, newFamLangLevel: 'Level', newFamLangInput: '' });
  }

  // Select hobby, to which user wants to add notes
  selectHobby(hobby) {
    this.setState({ selectedHobby: hobby, updatingNotes: hobby.notes });
  }

  // Update notes as user is typing
  updateNotesField(e) {
    this.setState({ updatingNotes: e.target.value });
  }

  // Save updated notes
  saveNotes() {
    this.state.selectedHobby.notes = this.state.updatingNotes;
  }


}

export default MeStore;
