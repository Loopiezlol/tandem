import React from 'react';
import Reflux from 'reflux';
import DiscoverStore from '../stores/discoverStore';
import actions from '../actions';

class Discover extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      boxContent: false,
    };
    this.store = DiscoverStore;

    actions.getResults({ searchText: '', boxContent: false });
  }

  render() {
    const { results, searchText, boxContent } = this.state;
    return (
      <div className="control-discover">
        <div className="control-discover-filter">
          <input type="text" value={searchText} onChange={e => this.handleType(e)} />
          <div>
            <input type="checkbox" checked={boxContent} onChange={e => this.handleBox(e)} /> Match with people of the same gender
          </div>
          <button onClick={() => actions.getResults({ name: searchText, sameGender: boxContent })}>
            Search!
          </button>
        </div>
        <div className="control-discover-results">
          {results && results.length ?
            results.map(user =>
              <div onClick={() => console.log(user.username, 'selected!')} className="result" key={`${user.username}`}>
                {user.username} ({user.gender})<br />
                <span className="result-flag">{user.mainLanguage.substring(0, 2)}</span>
              </div>)
            :
            <div className="control-discover-results-emptypage">No matches!</div>
          }
        </div>
      </div>
    );
  }

  handleType(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleBox(e) {
    this.setState({
      boxContent: e.target.checked,
    });
  }
}

export default Discover;
