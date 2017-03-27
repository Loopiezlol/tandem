import Reflux from 'reflux';

const actions = Reflux.createActions({
  sampleSyncAction: {},
  sampleAsyncAction: { asyncResult: true },
  getUsers: { asyncResult: true },
  createUser: { asyncResult: true },
  emailAction: {},
  usernameAction: {},
  passwordAction: {},
  repPA: {},
  emailActionL: {},
  passwordActionL: {},
  submitClick: { asyncResult: true },
  submitClickL: { asyncResult: true },
  handleLogin: { asyncResult: true },
  meFromToken: { asyncResult: true },
  handleLogOut: {},
  fetchLanguages: { asyncResult: true },
  fetchLevels: { asyncResult: true },
  getResults: { asyncResult: true },
  updateResults: { asyncResult: true },
  updateTempUser: { asyncResult: true },
});

export default actions;
