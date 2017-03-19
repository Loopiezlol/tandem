import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import React from 'react';
import Reflux from 'reflux';
import Filters from './filters';
import UserCard from './discover-search-result';
import DiscoverStore from '../stores/discoverStore';
import actions from '../actions';

import '../styles/discover.scss';

class Discover extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersVisible: false,
    };
    this.store = DiscoverStore;

    actions.getResults();
  }

  render() {
    const { results } = this.state;
    return (
      <MuiThemeProvider>
        <div className="control-discover">
          <Drawer open={this.state.filtersVisible} openSecondary>
            <AppBar
              title="Hide filters"
              onLeftIconButtonTouchTap={() => this.handleToggleDrawer()}
              onTitleTouchTap={() => this.handleToggleDrawer()}
            />
            <Filters />
          </Drawer>
          <AppBar
            className="appbar"
            iconElementRight={<FlatButton label="Show Filters" />}
            onRightIconButtonTouchTap={() => this.handleToggleDrawer()}
          />
          <div className="control-discover-results">
            {results && results.length ?
              results.map(user =>
                <UserCard className="results" me={user} />,
              )
              :
              <div className="control-discover-results-emptypage">No matches!</div>
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  handleToggleDrawer() {
    this.setState({
      filtersVisible: !this.state.filtersVisible,
    });
  }
}

export default Discover;
