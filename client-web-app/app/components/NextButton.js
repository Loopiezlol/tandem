import React, {Component} from 'react';
import FlatButton from '../node_modules/material-ui/FlatButton';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';


class NextButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const btnLabel = {
            color: 'white'
        }

        return (
          <MuiThemeProvider>
            <FlatButton backgroundColor = '#3c9b51'
            hoverColor = '#34bc52'
            label = 'Next'
            labelStyle = {
                btnLabel
            }
            style={{marginLeft:'10px'}}
            onClick = {this.props.onClick}
            disabled = {
                this.props.disabled
            }
            />
          </MuiThemeProvider>
        );
    }

}

export default NextButton;
