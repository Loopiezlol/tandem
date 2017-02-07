import Reflux from 'reflux';

const actions = Reflux.createActions({
  sampleSyncAction: {},
  sampleAsyncAction: { asyncResult: true },
  getUsers: { asyncResult: true },
  createUser: { asyncResult: true },
});

export default actions;
