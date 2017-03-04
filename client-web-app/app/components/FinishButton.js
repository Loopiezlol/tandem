import React, {Component} from 'react';
import FlatButton from '../node_modules/material-ui/FlatButton';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';


class FinishButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const btnLabel = {
            color: 'white'
        }

        return (
          <MuiThemeProvider>
            <FlatButton backgroundColor = '#325184'
            hoverColor = '#4d74b5'
            label = 'Finish'
            labelStyle = {
                btnLabel
            }
            style={{marginRight:'10px'}}
            onClick = {this.props.onClick}
            disabled = {
                this.props.disabled
            }
            />
          </MuiThemeProvider>
        );
    }

}

export default FinishButton;
