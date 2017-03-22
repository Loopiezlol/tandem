import React from 'react';
import Discover from './discover';
import Messaging from './messaging/messaging';
import '../styles/appStyles.scss';

const renderMainComponent = (componentName) => {
  switch (componentName) {
    case 'messaging':
      return <Messaging />;
    case 'profile':
      return <div>profile  :)</div>;
    case 'discover':
    default:
      return <Discover />;
  }
};

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
          <div onClick={() => this.handleOpen('discover')} className="wrapper-control-button" >
            <span className="paneTabBg" id="paneColor-warm">
              <img src={require('../../public/PaneControl/discover.svg')} className="paneTabIcon" />
              <p className="paneTabLabel">Discover</p>
            </span>
          </div>
          <div onClick={() => this.handleOpen('messaging')} className="wrapper-control-button" >
             <span className="paneTabBg" id="paneColor-powder">
                <img src={require('../../public/PaneControl/messaging.svg')} className="paneTabIcon" />
                <p className="paneTabLabel">Messaging</p>
              </span>
          </div>
          <div onClick={() => this.handleOpen('profile')} className="wrapper-control-button">
           <span className="paneTabBg" id="paneColor-peach">
              <img src={require('../../public/PaneControl/myProfile.svg')} className="paneTabIcon" />
              <p className="paneTabLabel">Profile</p>
            </span>
          </div>
        </div>
        <div className="opened-wrapper" >
          {renderMainComponent(opened)}
        </div>
      </div>
    );
  }

}

export default PaneControl;
