import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';
import config from '../../../common/config';

const prefix = require('superagent-prefix')(config.server);

class LevelsStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      levels: [],
    };
    this.listenables = actions;
  }

  fetchLevelsCompleted(res) {
    this.setState({
      levels: res.body,
    });
  }

  fetchLevelsFailed(err) {
    console.log(err);
    this.setState({
      levels: [],
    });
  }
}

actions.fetchLevels.listen(() => {
  request.get('/levels')
  .use(prefix)
  .set('x-access-token', localStorage.getItem('jwt'))
  .end((err, res) => {
    if (err) {
      actions.fetchLevels.failed(err);
    } else {
      actions.fetchLevels.completed(res);
    }
  });
});

export default LevelsStore;
