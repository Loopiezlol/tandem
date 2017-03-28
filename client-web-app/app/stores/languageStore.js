import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';
import config from '../../../common/config';

const prefix = require('superagent-prefix')(config.server);

class LanguagesStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      languages: [],
    };
    this.listenables = actions;
  }

  fetchLanguagesCompleted(res) {
    this.setState({
      languages: res.body,
    });
  }

  fetchLanguagesFailed(err) {
    console.log(err);
    this.setState({
      languages: [],
    });
  }
}

actions.fetchLanguages.listen(() => {
  request.get('http://localhost:3000/languages')
  .use(prefix)
  .set('x-access-token', localStorage.getItem('jwt'))
  .end((err, res) => {
    if (err) {
      actions.fetchLanguages.failed(err);
    } else {
      actions.fetchLanguages.completed(res);
    }
  });
});

export default LanguagesStore;
