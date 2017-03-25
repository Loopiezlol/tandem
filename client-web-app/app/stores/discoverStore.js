import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';

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
    });
  }

  static getResultsFailed(err) {
    console.log(err);
  }

  meFromTokenCompleted(res) {
    actions.getResults({}, res.body.user._id);
  }
}

actions.getResults.listen((options, id) => {
  request.get('http://0.0.0.0:3000/users/')
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
