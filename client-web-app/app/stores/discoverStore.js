import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions';

class DiscoverStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      results: [],
    };
    this.listenables = actions;
  }

  getResultsCompleted(res) {
    this.setState({
      results: res.body,
    });
  }

  static getResultsFailed(err) {
    console.log(err);
  }
}

actions.getResults.listen((options) => {
  request.get('http://0.0.0.0:3000/users/')
  .query(options)
  .end((err, res) => {
    if (err) {
      actions.getResults.failed(err);
    }
    actions.getResults.completed(res);
  });
});

export default DiscoverStore;
