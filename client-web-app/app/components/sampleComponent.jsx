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
    return (
      <div className="wrapper">
        <button onClick={() => actions.sampleAction('cartwoane')} />
      </div>
    );
  }

}

export default SampleComponent;
