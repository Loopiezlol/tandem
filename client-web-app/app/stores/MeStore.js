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
    console.log(value);
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


}

export default MeStore;
