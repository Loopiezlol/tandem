import Reflux from 'reflux';

const OnboardingActions = Reflux.createActions({
  getDetails: {},
  selectSex: {},
  addLanguage: {},
  updateLanguage: {},
  changeLangLevel: {},
  selectInterest: {},
  expandNotes: {},
  updateNotes: {},
  saveNotes: {},
  goNext: {},
  goBack: {},
  finish: { asyncResult: true },
});


export default OnboardingActions;
