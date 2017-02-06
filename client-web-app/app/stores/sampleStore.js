import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions';

class SampleStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      sampleSync: '',
      sampleAsync: '',
    };
    this.listenables = actions;
  }

  sampleSyncAction(input) {
    this.setState({
      sampleSync: input,
    });
  }

  sampleAsyncActionCompleted(res) {
    console.log(res);
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
}

actions.sampleAsyncAction.listen(() => {
  request.get('http://0.0.0.0:3000')
  .end((err, res) => {
    if (err) {
      actions.sampleAsyncAction.failed(err);
    }
    actions.sampleAsyncAction.completed(res);
  });
});

export default SampleStore;
