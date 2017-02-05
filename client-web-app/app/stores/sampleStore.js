import Reflux from 'reflux';
import actions from '../actions';

class SampleStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      sample: '',
    };
    this.listenables = actions;
  }

  onSampleAction(input) {
    this.setState({
      sample: input,
    });
  }
}

export default SampleStore;
