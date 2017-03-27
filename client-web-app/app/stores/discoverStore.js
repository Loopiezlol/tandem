import Reflux from 'reflux';
import request from 'superagent';
import config from '../../../common/config';
import actions from '../actions/actions';

const prefix = require('superagent-prefix')(config.server);


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
      startedLoading: false,
    });
  }

  static getResultsFailed(err) {
    console.log(err);
  }
}

actions.getResults.listen((options, id) => {
  request.get('/users')
  .use(prefix)
  .set('x-access-token', localStorage.getItem('jwt'))
  .set('id', id)
  .query(options)
  .end((err, res) => {
    if (err) {
      actions.getResults.failed(err);
    }
    actions.getResults.completed(res);
  });
});

export default DiscoverStore;
