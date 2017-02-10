import React from 'react';
import Reflux from 'reflux';

class sbUserLogin extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      sbUser: '',
    };
  }
  render() {
    const { sbUser } = this.state;
    return (
      <div className="wrapper-sb">
        <h2>SendBird Chat Interface</h2>
        <p>Select a User Name:</p>
        <div>
          <button onClick={() => this.handleCreate()}>Create SendBird User</button>
          <input type="text" value={sbUser} onChange={e => this.handleType(e)} />
        </div>
      </div>
    );
  }
  handleCreate() {
    const { sbUser } = this.state;
    if (!sbUser.length) {
      window.alert('Please insert an username');
    } else {
      // actions.createUser(newUser);
      // console.log('making a new SendBird user ' {sbUser} );
    }
  }
  handleType(e) {
    this.setState({
      sbUser: e.target.value,
    });
  }
}

export default sbUserLogin;
