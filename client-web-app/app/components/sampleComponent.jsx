import React from 'react';
import Reflux from 'reflux';
import SampleStore from '../stores/sampleStore';
import actions from '../actions';

class SampleComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = SampleStore;
  }

  render() {
    const { sampleSync, sampleAsync } = this.state;
    return (
      <div className="wrapper">
        <div className="show-data">
          <p>Sync: {sampleSync}</p>
          <p>Async: {sampleAsync}</p>
        </div>
        <div className="update-data">
          <button onClick={() => actions.sampleSyncAction('cartwoane')}>Sync</button>
          <button onClick={() => actions.sampleAsyncAction()}>Async</button>
        </div>
      </div>
    );
  }
}

export default SampleComponent;
