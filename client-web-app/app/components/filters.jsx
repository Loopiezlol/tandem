import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import CheckBox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import ChipInput from 'material-ui-chip-input';

import React from 'react';
import Reflux from 'reflux';
import actions from '../actions';

const me = {
  languages: [
    { id: '58b9ccf16a4efb4d7b96d5ba', name: 'English' },
    { id: '58b9cda0bb447f4e95953092', name: 'French' },
    { id: '58b9cdafe80f944ec8f14716', name: 'Spanish' },
  ],
};

class Filters extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      genderBoxContent: false,
      languageBoxContent: false,
      chips: [],
      interests: [],
    };
  }

  render() {
    const { searchText, genderBoxContent, languageBoxContent, chips } = this.state;
    const queryParameters = {
      name: searchText,
      sameGender: genderBoxContent,
      matchLanguages: languageBoxContent,
      languagesToMatch: chips.map(chip => chip.value),
    };
    return (
      <Paper className="control-discover-filter">
        <TextField
          hintText="username:"
          // floatingLabelText="username:"
          // floatingLabelFixed
          onChange={e => this.handleType(e)}
        />
        <Divider />
        <CheckBox
          label="Match with people of the same gender"
          onCheck={(e, checked) => this.handleGenderBox(checked)}
        />
        <CheckBox
          label="Only show people that want to learn my language"
          onCheck={(e, checked) => this.handleLanguageBox(checked)}
        />
        <ChipInput
          floatingLabelText="Display users that speak:"
          openOnFocus
          hintText="Just type in languages"
          value={this.state.chips}
          dataSource={me.languages}
          dataSourceConfig={{ text: 'name', value: 'id' }}
          onRequestAdd={chip => this.handleAddChip(chip)}
          onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
        />
        <FlatButton
          style={{ width: '100%' }}
          fullWidth
          label="Search"
          primary
          onTouchTap={() => actions.getResults(queryParameters)}
        />
      </Paper>
    );
  }

  handleAddChip(chip) {
    const foundLanguage = me.languages.find(language => language.name.match(new RegExp(`^${chip.name}`, 'i')));
    console.log(foundLanguage, chip, foundLanguage === chip);
    if (!foundLanguage) {
      alert('No such language!');
      return;
    }
    if (this.state.chips.includes(foundLanguage)) {
      return;
    }
    // if (me.languages.indexOf(chip) === -1) {
    //   let chipToAdd;
    //   console.log(filtered);
    //   if (filtered && filtered.length) {
    //     chipToAdd = filtered[0];
    //   }
    //   alert('No such language!');
    //   return;
    // }
    //

    this.setState({
      chips: [...this.state.chips, foundLanguage],
    });
  }

  handleDeleteChip(chip, index) {
    const tempChips = this.state.chips;
    tempChips.splice(index, 1);
    this.setState({
      chips: tempChips,
    });
  }

  handleType(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleGenderBox(checked) {
    this.setState({
      genderBoxContent: checked,
    });
  }

  handleLanguageBox(checked) {
    this.setState({
      languageBoxContent: checked,
    });
  }
}

export default Filters;
