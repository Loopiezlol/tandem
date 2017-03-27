import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';

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
  request.get('http://localhost:3000/levels')
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
