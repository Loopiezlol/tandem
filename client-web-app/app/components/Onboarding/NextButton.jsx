import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


function NextButton({ disabled, onClick: _onClick }) {
  const btnLabel = {
    color: 'white',
  };
  return (
    <MuiThemeProvider>
      <FlatButton
        backgroundColor="#3c9b51"
        hoverColor="#34bc52"
        label="Next"
        labelStyle={btnLabel}
        style={{ marginLeft: '10px' }}
        onClick={_onClick}
        disabled={disabled}
      />
    </MuiThemeProvider>
  );
}

NextButton.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default NextButton;
