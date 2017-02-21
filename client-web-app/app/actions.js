import Reflux from 'reflux';

const actions = Reflux.createActions({
  sampleSyncAction: {},
  sampleAsyncAction: { asyncResult: true },
  getUsers: { asyncResult: true },
  createUser: { asyncResult: true },
  emailAction: {},
  passwordAction: {},
  repPA: {},
  submitClick: { asyncResult: true },
});

export default actions;
