import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';
import config from '../../../common/config';

const prefix = require('superagent-prefix')(config.server);


/* Discove subsection
which allows you to get the users list according to filtering
selection
*/
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
      showLoading: false,
      filtersVisible: false,
      loadedFirstTime: false,
    });
  }

  static getResultsFailed(err) {
    console.log(err);
  }
}

actions.getResults.listen((options, id) => {
  request.get('/users/')
  .use(prefix)
  .withCredentials()
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
