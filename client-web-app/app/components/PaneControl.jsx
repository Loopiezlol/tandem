import React from 'react';

class PaneControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: 'discover',
    };
    // this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(opened) {
    this.setState({
      opened,
    });
  }

  render() {
    const { opened } = this.state;
    return (
      <div className="main-wrapper">
        <div className="control-tabs">
          <div className="control-discover" onClick={() => this.handleOpen('discover')}>
            <p>Click me</p>
          </div>
          <div className="control-messaging" onClick={() => this.handleOpen('messaging')}>
            <p>Click me</p>
          </div>
          <div className="control-profile" onClick={() => this.handleOpen('profile')}>
            <p>Click me</p>
          </div>
        </div>
        {opened === 'discover' && <p>discover component should go here</p>}
        {opened === 'messaging' && <p>message component should go here</p>}
        {opened === 'profile' && <p>profile component should go here</p>}
      </div>
    );
  }

}

export default PaneControl;
