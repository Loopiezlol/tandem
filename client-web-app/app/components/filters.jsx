import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import CheckBox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import ChipInput from 'material-ui-chip-input';

import React from 'react';
import Reflux from 'reflux';
import actions from '../actions';

class Filters extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      boxContent: false,
      chips: [],
      interests: [],
    };
  }

  render() {
    const { searchText, boxContent, chips } = this.state;
    const dataSource = [
      { text: 'English', value: '58b9ccf16a4efb4d7b96d5ba' },
      { text: 'French', value: '58b9cda0bb447f4e95953092' },
      { text: 'Spanish', value: '58b9cdafe80f944ec8f14716' },
    ];
    const queryParameters = {
      name: searchText,
      sameGender: boxContent,
      languagesToMatch: chips.map(chip => chip.value),
    };
    return (
      <Paper className="control-discover-filter">
        <TextField
          hintText="username:"
          // floatingLabelText="username:"
          // floatingLabelFixed
          onChange={e => this.handleType(e)}
        /><br />
        <Divider />
        <CheckBox
          label="Match with people of the same gender"
          onCheck={(e, checked) => this.handleBox(checked)}
        />
        <ChipInput
          floatingLabelText="Select languages"
          value={this.state.chips}
          dataSource={dataSource}
          dataSourceConfig={{ text: 'text', value: 'value' }}
          onRequestAdd={chip => this.handleAddChip(chip)}
          onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
        />
        <FlatButton
          label="Search"
          primary
          onTouchTap={() => actions.getResults(queryParameters)}
        />
      </Paper>
    );
  }

  handleAddChip(chip) {
    this.setState({
      chips: [...this.state.chips, chip],
    });
  }

  handleDeleteChip(chip, index) {
    const tempChips = this.state.chips;
    tempChips.splice(index, 1);
    this.setState({
      chips: tempChips,
    });
    console.log(index);
  }

  handleType(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleBox(checked) {
    this.setState({
      boxContent: checked,
    });
  }
}

export default Filters;
