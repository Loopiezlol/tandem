import Reflux from 'reflux';

const actions = Reflux.createActions({
  sampleSyncAction: {},
  sampleAsyncAction: { asyncResult: true },
  getUsers: { asyncResult: true },
  createUser: { asyncResult: true },
  getResults: { asyncResult: true },
});

export default actions;
