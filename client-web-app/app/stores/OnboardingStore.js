import Reflux from 'reflux';
import OnboardingActions from '../actions/OnboardingActions';


class OnboardingStore extends Reflux.Store {
  constructor() {
    super();
    const iconsWithLabels = [
          {
            icon:"airplane",
            label: "Travelling",
            state:'unselected',
            notes:''
          },
          {
            icon:"kitchen",
            label: "Cooking",
            state:'unselected',
            notes:''
          },
          {
            icon:"photo-camera",
            label: "Photography",
            state:'unselected',
            notes:''
          },
          {
            icon:"poker",
            label: "Gambling",
            state:'unselected',
            notes:''
          },
          {
            icon:"books",
            label: "Reading",
            state:'unselected',
            notes:''
          },
          {
            icon:"diamond",
            label: "Fashion",
            state:'unselected',
            notes:''
          },
          {
            icon:"gamepad",
            label: "Video Games",
            state:'unselected',
            notes:''
          },
          {
            icon:"music-player",
            label: "Music",
            state:'unselected',
            notes:''
          },
          {
            icon:"ping-pong",
            label: "Sports",
            state:'unselected',
            notes:''
          },
          {
            icon:"popcorn",
            label: "Movies",
            state:'unselected',
            notes:''
          },
          {
            icon:"televisions",
            label: "TV Series",
            state:'unselected',
            notes:''
          },
          {
            icon:"voice-recorder",
            label:"Singing",
            state:'unselected',
            notes:''
          }
        ]
    this.state ={userInfo:{firstName:null,lastName:null,sex:null,age:null,errorMsgInfo:'',motherLanguage:null,familiarLanguages:[],interests:[]},langLevel:'Level',currLang:null,interests:iconsWithLabels,stage:'userInfoStage'};
    this.listenables = OnboardingActions;
  }



    // Events for updating the input values for the user's first and last name, and age
    getDetails (e) {
      const user = this.state.userInfo;
      const inputValue = e.target.value;
      switch (e.target.id) {
          case 'firstName':
            if (/^[a-zA-Z]+$/.test(inputValue)) {
              this.setState({userInfo: {...this.state.userInfo, firstName: inputValue}});
              if(this.state.firstNameError) {
                this.setState({firstNameError:false});
              }
            }else {
              this.setState({firstNameError:true});
            }
            break;
          case 'lastName':
            if (/^[a-zA-Z]+$/.test(inputValue)) {
              this.setState({userInfo: {...this.state.userInfo, lastName: inputValue}});
              if(this.state.lastNameError) {
                this.setState({lastNameError:false});
              }
            }else {
              this.setState({lastNameError:true});
            }
            break;
          case 'age':
            if (!isNaN(e.target.value)) {
              this.setState({userInfo: {...this.state.userInfo, age: inputValue}});
            }
            break;
          }
        console.log(this.state.userInfo);
    }


     // Click event for updating the user's sex
    selectSex = (name) => {
       this.setState({userInfo: {...this.state.userInfo, sex: name}});
       console.log(this.state.userInfo);
    }

    // Check if all user information is provided
    isInfoComplete () {
      const user = this.state.userInfo;
      const userInfoProps = ['firstName','lastName','age','sex'];
      return userInfoProps.every((prop) => {
        return user[prop]!=null && user[prop] !== "";
      });
    }

    isLanguagesComplete = () => {
      const user = this.state.userInfo;
      const userInfoProps = ['motherLanguage','familiarLanguages'];
      return userInfoProps.every((prop) => {
        return user[prop]!=null && user[prop] !== "";
      });
    }

    // ------------- Languages stage ------------- //

    // Handle change in input text field
    updateLanguage = (e) => {
        this.setState({currLang:e.target.value})
    }


    // Handle change in language level
    changeLangLevel = (event, index, value) => this.setState({langLevel:value});

    // Add a language the user is familiar with the list
    addLanguage = () => {
        const userInfoState = this.state.userInfo;
        const newLang = this.state.currLang;

        if(userInfoState.motherLanguage===null) {
          userInfoState.motherLanguage=newLang;
          this.setState({currLang:'',userInfo:userInfoState});
        }
        else {
          const stateLangList = userInfoState.familiarLanguages;
          const level = this.state.langLevel;
          console.log(`${newLang} is in ${stateLangList} : ${stateLangList.indexOf(newLang) > 0}`);
          stateLangList.push({name:newLang,level:level});
          this.setState({userInfo: {...this.state.userInfo, familiarLanguages: stateLangList}, level:'Level'});

        }
    }


    // ------------- Interests stage ------------- //

    // Select interest and add it to the list of user's interests
    selectInterest = (hobby) => {
      const userInfoState = this.state.userInfo;
      const interestsState = userInfoState.interests;
      if (hobby.state === 'unselected') {
          hobby.state='selected';
          interestsState.push(hobby);
      } else {
          hobby.state='unselected';
          const idx = interestsState.indexOf(hobby);
          interestsState.splice(idx,1);
      }
      this.setState({userInfo: {...this.state.userInfo, interests: interestsState}});
      console.log(this.state.userInfo.interests);
    }

    expandNotes = (hobby) => {
       this.setState({toAddNotes:hobby});
       console.log("Hobby is : " + this.state.toAddNotes.label);
    }

    updateNotes = (e) => {
      this.state.userInfo.interests.forEach((hobby) => {
        if(hobby === this.state.toAddNotes) {
          hobby.notes += e.target.value + '\n';
        }
      })
      console.log(this.state.userInfo.interests);
    }

    saveNotes = (e) => {
      console.log();
    }


    goNext () {
      const x = this;
      switch (this.state.stage) {
        case 'userInfoStage':
            if (this.isInfoComplete()) {
              this.setState({stage:'languagesStage'});
            }
            else {
              this.setState({userInfoError:true});
              setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-leave'})},3000);
              setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-appear',userInfoError:false})},3400);
            }
            break;
        case 'languagesStage':
        console.log(`Languages are complete : ${this.isLanguagesComplete()}`);
            if (this.state.userInfo.motherLanguage == null || this.state.userInfo.motherLanguage === '') {
                this.setState({motherLangError:true});
                setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-leave'})},3000);
                setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-appear',motherLangError:false})},3400);
                console.log('Please enter your mother language');
            }
            else if (this.state.userInfo.familiarLanguages.length === 0) {
                this.setState({famLangError:true});
                setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-leave'})},3000);
                setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-appear',famLangError:false})},3400);
                console.log('Please add the languages you want to practice');
            }
            else {
              this.setState({stage:'interestsStage'});
            }
            break;
        case 'interestsStage':
            if (this.state.userInfo.interests.length < 3) {
              this.setState({interestsError:true})
              setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-leave'})},3000);
              setTimeout(() => {x.setState({langErrorWrap:'languagesErrorWrap-appear',interestsError:false})},3400);
            }
            else {
              this.setState({toAddNotes:this.state.userInfo.interests[0],stage:'interestsNotesStage'});
              console.log(this.state.userInfo);
            }
            break;
      }

    }
}

export default OnboardingStore;
