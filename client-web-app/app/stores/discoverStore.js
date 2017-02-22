import Reflux from 'reflux';

class DiscoverStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }
}

export default DiscoverStore;
