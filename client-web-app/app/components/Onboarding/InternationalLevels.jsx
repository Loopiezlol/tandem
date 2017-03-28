import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import '../../styles/Onboarding/InternationalLevels.scss';

class InternationalLevels extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selectLevel: null };
  }

  // Click event, which is triggered when more information is requested
  // about a certain level of language proficiency
  selectLevel = (level) => {
    this.setState({ selectedLevel: level, descAnimation: '' }, () => {
      setTimeout(() => { this.setState({ descAnimation: 'descAnimation' }); }, 0);
    });
  }


  render() {
    const levelsData = [
      { level: 'A1', desc: 'You are comfortable introducing yourself and others and can ask and asnwer questions about personal details such as where you live, people you know and things you have.' },
      { level: 'A2', desc: 'You can describe in simple terms aspects of your background, immediate environment and matters in areas of immediate need.' },
      { level: 'B1', desc: 'You can describe experiences and events, dreams, hopes, ambitions and briefly give reasons and explanations for opinions and plans.' },
      { level: 'B2', desc: 'Can produce clear detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving advantages and disadvantages of various opinions.' },
      { level: 'C1', desc: 'Can use language flexibly and effectively for social, academic and professional purposes. ' },
      { level: 'C2', desc: 'Can understand with ease virtually everything you hear or read.' },
    ];

    const levels = levelsData.map(info => (
      <div>
        <p className="levelAbrLabel" onClick={() => this.selectLevel(info)}>
          {info.level}
        </p>
        <p className="levelDescLabel" id={this.state.descAnimation}>
          {(this.state.selectedLevel || {}).level === info.level && info.desc}
        </p>
      </div>
      ));

    return (
      <div>
        <MuiThemeProvider>
          <Paper className="intLevelsContainer">
            <p id="internationalLevelsHeading">Click on a level to learn more</p>
            {levels}
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }


}

export default InternationalLevels;
