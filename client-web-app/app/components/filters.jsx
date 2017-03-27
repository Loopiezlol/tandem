import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import CheckBox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import ChipInput from 'material-ui-chip-input';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import React from 'react';
import Reflux from 'reflux';
import actions from '../actions/actions';
import Auth from '../stores/auth';

import iconsWithLabels from '../interests';

class Filters extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      genderBoxContent: false,
      languageBoxContent: false,
      chips: [],
      interests: iconsWithLabels.map(x => ({ name: x.label, selected: false, icon: x.icon })),
    };
    this.stores = [Auth];
  }

  render() {
    const { searchText, genderBoxContent, languageBoxContent, chips, interests, me } = this.state;
    const queryParameters = {
      name: searchText,
      sameGender: genderBoxContent,
      matchLanguages: languageBoxContent,
      languagesToMatch: chips.map(chip => chip._id),
      interests: interests.filter(x => x.selected).map(x => x.name),
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
          dataSource={me.wantsToLearn}
          dataSourceConfig={{ text: 'name', value: '_id' }}
          onRequestAdd={chip => this.handleAddChip(chip)}
          onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
        />
        <div>
          Choose interests:<br />
          {interests.map(interest => (
            <IconButton
              key={`interest-${interest.name}`}
              tooltip={interest.name}
              onTouchTap={() => this.handleInterest(interest)}
            >
              {/* <ActionHome className={interest.selected ? 'selected' : ''} /> */}
              <img className={`interest-icon ${interest.selected ? 'selected' : ''}`} src={require(`../../public//png/${interest.icon}.png`)} />

            </IconButton>
          ))}
        </div>
        <FlatButton
          style={{ width: '100%' }}
          fullWidth
          label="Search"
          primary
          onTouchTap={() => actions.getResults(queryParameters, this.state.me._id)}
        />
      </Paper>
    );
  }

  handleInterest(interest) {
    const { interests } = this.state;
    const foundIndex = interests.findIndex(x => x.name === interest.name);
    if (foundIndex !== -1) {
      interests[foundIndex].selected = !interests[foundIndex].selected;
    }
    this.setState({
      interests,
    });
  }

  handleAddChip(chip) {
    const foundLanguage = this.state.me.wantsToLearn.find(language => language.name.match(new RegExp(`^${chip.name}`, 'i')));
    if (!foundLanguage) {
      alert('No such language!');
      return;
    }
    if (this.state.chips.includes(foundLanguage)) {
      return;
    }

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
