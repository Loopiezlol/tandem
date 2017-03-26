import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
      showLoading: true,
      loadedFirstTime: true,
    };
    this.stores = [DiscoverStore, Auth];
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.me._id && nextState.loadedFirstTime) {
      actions.getResults({}, nextState.me._id);
    }
  }

  render() {
    const { results, showLoading, filtersVisible } = this.state;
    return (
      <MuiThemeProvider>
        <div className="control-discover">
          {showLoading ?
            <RefreshIndicator className="loading-circle" status="loading" />
            :
            <div className={`control-discover-results ${filtersVisible ? 'blur' : ''}`}>
              {results && results.length ?
                results.map(user =>
                  <UserCard className="results" me={user} />,
                )
                :
                <div className="control-discover-results-emptypage">No matches!</div>
              }
            </div>
          }
          <Filters
            visible={filtersVisible}
            onSearch={(queryParameters, id) => this.handleSearch(queryParameters, id)}
          />
          <FloatingActionButton
            className="toggle-filter-button"
            onTouchTap={() => this.handleToggleFilters()}
          >
            <ContentFilterList />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    );
  }

  handleSearch(queryParameters, id) {
    this.setState({
      showLoading: true,
    });
    actions.getResults(queryParameters, id);
  }

  handleToggleFilters() {
    this.setState({
      filtersVisible: !this.state.filtersVisible,
    });
  }
}

export default Discover;
