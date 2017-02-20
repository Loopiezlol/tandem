import Reflux from 'reflux';

const SBActions = Reflux.createActions({
  createUser: { asyncResult: true },
  loadOnlineUsersList: { asyncResult: true },
  createChannel: { asyncResult: true },
  sendMessage: { asyncResult: true },
});

export default SBActions;
