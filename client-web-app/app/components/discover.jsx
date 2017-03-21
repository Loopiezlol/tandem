import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';

import React from 'react';
import Reflux from 'reflux';
import Filters from './filters';
import UserCard from './discover-search-result';
import DiscoverStore from '../stores/discoverStore';
import Auth from '../stores/auth';
import actions from '../actions/actions';

import '../styles/discover.scss';

class Discover extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersVisible: false,
    };
    this.stores = [DiscoverStore, Auth];

    actions.getResults({}, ((this.state || {}).me || {})._id);
  }

  render() {
    const { results } = this.state;
    return (
      <MuiThemeProvider>
        <div className="control-discover">
          <Drawer
            open={this.state.filtersVisible}
            openSecondary
            docked={false}
            onRequestChange={filtersVisible => this.handleSwipeDrawer(filtersVisible)}
          >
            <AppBar
              title="Hide filters"
              onLeftIconButtonTouchTap={() => this.handleToggleDrawer()}
              onTitleTouchTap={() => this.handleToggleDrawer()}
            />
            <Filters />
          </Drawer>
          <AppBar
            className="appbar"
            iconElementRight={<IconButton><ContentFilterList /></IconButton>}
            onRightIconButtonTouchTap={() => this.handleToggleDrawer()}
          />
          <div className="control-discover-results">
            {results && results.length ?
              results.map(user =>
                <UserCard className="result" me={user} />,
              )
              :
              <div className="control-discover-results-emptypage">No matches!</div>
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  handleSwipeDrawer(filtersVisible) {
    this.setState({ filtersVisible });
  }

  handleToggleDrawer() {
    this.setState({
      filtersVisible: !this.state.filtersVisible,
    });
  }
}

export default Discover;
