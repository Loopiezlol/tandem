import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';


/* This class is only
a sample to follow for react.js
*/
class SampleStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      sampleSync: '',
      sampleAsync: '',
      users: [],
    };
    this.listenables = actions;
  }

  sampleSyncAction(input) {
    this.setState({
      sampleSync: input,
    });
  }

  sampleAsyncActionCompleted(res) {
    this.setState({
      sampleAsync: res.text,
    });
  }

  sampleAsyncActionFailed(err) {
    console.log(err);
    this.setState({
      sampleAsync: 'error',
    });
  }

  getUsersCompleted(res) {
    this.setState({
      users: res.body,
    });
  }

  static getUsersFailed(err) {
    console.log(err);
  }

  static createUserCompleted(res) {
    if (res.status === 200) {
      console.log('User successfully created');
    } else {
      console.log('unexpected behaviour');
    }
  }

  static createUserFailed(err) {
    console.log(err);
  }
}


actions.sampleAsyncAction.listen(() => {
  request.get('http://0.0.0.0:3000/')
  .end((err, res) => {
    if (err) {
      actions.sampleAsyncAction.failed(err);
    }
    actions.sampleAsyncAction.completed(res);
  });
});

actions.getUsers.listen(() => {
  request.get('http://0.0.0.0:3000/users/')
  .end((err, res) => {
    if (err) {
      actions.getUsers.failed(err);
    }
    actions.getUsers.completed(res);
  });
});

actions.createUser.listen((username) => {
  request.put('http://0.0.0.0:3000/users/')
  .send({ username })
  .end((err, res) => {
    if (err) {
      actions.createUser.failed(err);
    }
    actions.createUser.completed(res);
  });
});

export default SampleStore;
