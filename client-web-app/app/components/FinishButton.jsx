import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function FinishButton({ onClick: _onClick }) {
  const btnLabel = {
    color: 'white',
  };
  return (
    <MuiThemeProvider>
      <FlatButton
        backgroundColor="#325184"
        hoverColor="#4d74b5"
        label="Finish"
        labelStyle={btnLabel}
        style={{ marginRight: '10px' }}
        onClick={_onClick}
        disabled={this.props.disabled}
      />
    </MuiThemeProvider>
  );
}

FinishButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};


export default FinishButton;
