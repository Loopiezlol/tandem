import Reflux from 'reflux';
import request from 'superagent';
import OnboardingActions from '../actions/OnboardingActions';
import iconsWithLabels from '../interests';
import config from '../../../common/config';

const prefix = require('superagent-prefix')(config.server);

class OnboardingStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      userInfo: {
        firstName: null,
        lastName: null,
        sex: null,
        age: null,
        errorMsgInfo: '',
        motherLanguage: null,
        familiarLanguages: [],
        interests: [],
        profilePicutre: '',
      },
      langLevel: 'Level',
      currLang: null,
      interests: iconsWithLabels,
      stage: 'userInfoStage',
      onboardingFinishStatus: null,
    };
    this.listenables = OnboardingActions;
    // this.listenTo(actions.fetchLanguages, this.fetchLanguages);
  }


  // Events for updating the input values for the user's first and last name, and age
  getDetails(e) {
    const inputValue = e.target.value;
    switch (e.target.id) {
      case 'firstName':
        if (/^[a-zA-Z]+$/.test(inputValue)) {
          this.setState({ userInfo: { ...this.state.userInfo, firstName: inputValue } });
          if (this.state.firstNameError) {
            this.setState({ firstNameError: false });
          }
        } else {
          this.setState({ firstNameError: true });
        }
        break;
      case 'lastName':
        if (/^[a-zA-Z]+$/.test(inputValue)) {
          this.setState({ userInfo: { ...this.state.userInfo, lastName: inputValue } });
          if (this.state.lastNameError) {
            this.setState({ lastNameError: false });
          }
        } else {
          this.setState({ lastNameError: true });
        }
        break;
      case 'age':
        if (!isNaN(e.target.value)) {
          this.setState({ userInfo: { ...this.state.userInfo, age: inputValue } });
        }
        break;
      default:
    }
  }


   // Click event for updating the user's sex
  selectSex = (name) => {
    this.setState({ userInfo: { ...this.state.userInfo, sex: name } });
    console.log(this.state.userInfo);
  }

  // Check if all user information is provided
  isInfoComplete() {
    const user = this.state.userInfo;
    const userInfoProps = ['firstName', 'lastName', 'age', 'sex'];
    return userInfoProps.every(prop => user[prop] != null && user[prop] !== '');
  }

  isLanguagesComplete = () => {
    const user = this.state.userInfo;
    const userInfoProps = ['motherLanguage', 'familiarLanguages'];
    return userInfoProps.every(prop => user[prop] != null && user[prop] !== '');
  }

  // ------------- Languages stage ------------- //

  // Handle change in input text field
  updateLanguage = (input) => {
    this.setState({ currLang: input });
  }


  // Handle change in language level
  changeLangLevel = (event, index, value) => this.setState({ langLevel: value });

  // Add a language the user is familiar with the list
  addLanguage = (languages, levels) => {
    const { userInfo: userInfoState, currLang: newLang,
      langLevel: level } = this.state;

    if (userInfoState.motherLanguage === null) {
      userInfoState.motherLanguage = newLang;
      this.setState({ currLang: '', userInfo: userInfoState });
    } else {
      const stateLangList = userInfoState.familiarLanguages;
      if (languages.map(l => l.name).indexOf(newLang) !== -1
        && levels.map(l => l.name).indexOf(level) !== -1) {
        stateLangList.push({ name: newLang, level });
      } else {
        console.error(`Either ${level} or ${newLang} is not set correctly`);
      }
      this.setState({ userInfo: { ...this.state.userInfo, familiarLanguages: stateLangList }, level: 'Level' });
    }
  }


  // ------------- Interests stage ------------- //

  // Select interest and add it to the list of user's interests
  selectInterest = (hobby) => {
    const userInfoState = this.state.userInfo;
    const interestsState = userInfoState.interests;
    if (hobby.state === 'unselected') {
      hobby.state = 'selected';           //eslint-disable-line
      interestsState.push(hobby);
    } else {
      hobby.state = 'unselected';         //eslint-disable-line
      const idx = interestsState.indexOf(hobby);
      interestsState.splice(idx, 1);
    }
    this.setState({ userInfo: { ...this.state.userInfo, interests: interestsState } });
  }

  expandNotes = (hobby) => {
    this.setState({ toAddNotes: hobby });
  }

  updateNotes = (e) => {
    this.state.userInfo.interests.forEach((hobby) => {
      if (hobby === this.state.toAddNotes) {
        hobby.notes += `${e.target.value}\n`;   //eslint-disable-line
      }
    });
  }


  goNext() {
    const x = this;
    switch (this.state.stage) {
      case 'userInfoStage':
        if (this.isInfoComplete()) {
          this.setState({ stage: 'languagesStage' });
        } else {
          this.setState({ userInfoError: true });
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-leave' }); }, 3000);
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-appear', userInfoError: false }); }, 3400);
        }
        break;
      case 'languagesStage':
        if (this.state.userInfo.motherLanguage == null || this.state.userInfo.motherLanguage === '') {
          this.setState({ motherLangError: true });
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-leave' }); }, 3000);
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-appear', motherLangError: false }); }, 3400);
        } else if (this.state.userInfo.familiarLanguages.length === 0) {
          this.setState({ famLangError: true });
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-leave' }); }, 3000);
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-appear', famLangError: false }); }, 3400);
        } else {
          this.setState({ stage: 'interestsStage' });
        }
        break;
      case 'interestsStage':
        if (this.state.userInfo.interests.length < 3) {
          this.setState({ interestsError: true });
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-leave' }); }, 3000);
          setTimeout(() => { x.setState({ langErrorWrap: 'languagesErrorWrap-appear', interestsError: false }); }, 3400);
        } else {
          this.setState({ toAddNotes: this.state.userInfo.interests[0], stage: 'interestsNotesStage' });
        }
        break;
      default:
    }
  }

  finishCompleted(res) {
    this.setState({
      onboardingFinishStatus: res.body.success ? 'ok' : 'fail',
    });
  }
  finishFailed(err) {
    console.log(err);
    this.setState({
      onboardingFinishStatus: 'fail',
    });
  }

  setImage(src) {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        profilePicutre: src,
      },
    });
  }
}


function getBase64Image(img) {
  const image = new Image();
  image.src = img;

  // Create an empty canvas element
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  // Copy the image contents to the canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  const dataURL = canvas.toDataURL('image/png');

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}


OnboardingActions.finish.listen((userInfo, id) => {
  const interests = userInfo.interests.map(i => ({
    name: i.label,
    notes: i.notes,
  }));
  const info = {
    gender: userInfo.sex === 'male' ? 'M' : 'F',
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    age: userInfo.age,
    interests,
    mainLanguage: userInfo.motherLanguage,
    wantsToLearn: userInfo.familiarLanguages,
    profilePicutre: getBase64Image(userInfo.profilePicutre),
  };

  request.put('/me/finish-onboarding')
    .use(prefix)
    .send({ info, id })
    .set('x-access-token', localStorage.getItem('jwt'))
    .end((err, res) => {
      if (err) {
        OnboardingActions.finish.failed(err);
      } else {
        OnboardingActions.finish.completed(res);
      }
    });
});

export default OnboardingStore;
