import React, {Component} from 'react';
import DropDownMenu from '../node_modules/material-ui/DropDownMenu';
import MenuItem from '../node_modules/material-ui/MenuItem';

class LanguageLevel extends React.Component {

  constructor(props) {
    super(props);
  }

    render ()  {

      return  (
        <DropDownMenu
        className = {this.props.className}
        value = {this.props.value}
        onChange={this.props.onChange}>
          <MenuItem value = {'Level'} primaryText="Level" />
          <MenuItem value = {'C2'} primaryText="C2" />
          <MenuItem value = {'C1'} primaryText="C1" />
          <MenuItem value = {'B2'} primaryText="B2" />
          <MenuItem value = {'B1'} primaryText="B1" />
          <MenuItem value = {'A2'} primaryText="A2" />
          <MenuItem value = {'A1'} primaryText="A1" />
        </DropDownMenu>
      );
  }

}

  export default LanguageLevel;
