import React from 'react';
import Reflux from 'reflux';
import Paper from 'material-ui/Paper';
import SBStore from '../../stores/sbStore';

// The component rendered in chat when a user selects to book a room

class libBookComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = SBStore;
    this.state = { testthing: 1, label: 'Hello' };
  }

// the function cast library book rooming page
// to the screen
  render() {
    return (
      <Paper style={{ boxShadow: 'none' }}>
        <h1>Book a Room at KCL</h1>
        <iframe src="http://libcal.kcl.ac.uk/mobile.php" width="450pc" height="700pc">
          <p>Your browser does not support iframes.</p>
        </iframe>
      </Paper>
    );
  }
}


export default libBookComponent;
