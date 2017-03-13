import Reflux from 'reflux';
import MeActions from '../actions/MeActions'


  class MeStore extends Reflux.Store {

    constructor (props) {
      super(props);

      const langs =  ['Abkhaz', 'Afar', 'Afrikaans', 'Akan', 'Albanian', 'Amharic', 'Arabic', 'Aragonese', 'Armenian', 'Assamese', 'Avaric', 'Avestan', 'Aymara', 'Azerbaijani', 'Bambara', 'Bashkir', 'Basque', 'Belarusian', 'Bengali', 'Bihari', 'Bislama', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan', 'Chamorro', 'Chechen', 'Chichewa', 'Chinese', 'Chuvash', 'Cornish', 'Corsican', 'Cree', 'Croatian', 'Czech', 'Danish', 'Divehi', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Ewe', 'Faroese', 'Fijian', 'Finnish', 'French', 'Fula', 'Galician', 'Georgian', 'German', 'Greek', 'Guaraní', 'Gujarati', 'Haitian', 'Hausa', 'Hebrew', 'Herero', 'Hindi', 'Hiri Motu', 'Hungarian', 'Interlingua', 'Indonesian', 'Interlingue', 'Irish', 'Igbo', 'Inupiaq', 'Ido', 'Icelandic', 'Italian', 'Inuktitut', 'Japanese', 'Javanese', 'Kalaallisut', 'Kannada', 'Kanuri', 'Kashmiri', 'Kazakh', 'Khmer', 'Kikuyu, Gikuyu', 'Kinyarwanda', 'Kirghiz', 'Komi', 'Kongo', 'Korean', 'Kurdish', 'Kwanyama','Latin', 'Luxembourgish', 'Luganda', 'Limburgish', 'Lingala', 'Lao', 'Lithuanian', 'Luba-Katanga', 'Latvian', 'Manx', 'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Māori', 'Marathi', 'Marshallese', 'Mongolian', 'Nauru', 'Navajo, Navaho', 'Norwegian Bokmål', 'North Ndebele', 'Nepali', 'Ndonga', 'Norwegian Nynorsk', 'Norwegian', 'Nuosu', 'South Ndebele', 'Occitan', 'Ojibwe', 'Oromo', 'Oriya', 'Ossetian', 'Panjabi', 'Pāli', 'Persian', 'Polish', 'Pashto', 'Portuguese', 'Quechua', 'Romansh', 'Kirundi', 'Romanian', 'Russian', 'Sanskrit', 'Sardinian', 'Sindhi', 'Northern Sami', 'Samoan', 'Sango', 'Serbian', 'Gaelic', 'Shona', 'Sinhala', 'Slovak', 'Slovene', 'Somali', 'Southern Sotho', 'Spanish', 'Sundanese', 'Swahili', 'Swati', 'Swedish', 'Tamil', 'Telugu', 'Tajik', 'Thai', 'Tigrinya', 'Tibetan', 'Turkmen', 'Tagalog', 'Tswana', 'Tonga', 'Turkish', 'Tsonga', 'Tatar', 'Twi', 'Tahitian', 'Uighur', 'Ukrainian', 'Urdu', 'Uzbek', 'Venda', 'Vietnamese', 'Volapük', 'Walloon', 'Welsh', 'Wolof', 'Western Frisian', 'Xhosa', 'Yiddish', 'Yoruba', 'Zhuang'];

      const iconsWithLabels = [
            {
              icon:"airplane",
              label: "Travelling",
              state:'selected',
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
              state:'selected',
              notes:''
            },
            {
              icon:"ping-pong",
              label: "Sports",
              state:'selected',
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
      this.listenables = MeActions;
      this.state = {allLanguages : langs,newFamLangLevel:'Level', userInfo: {firstName:'Radoslav',lastName:'Naydenov',age:20,sex:'male',motherLanguage:'Bulgarian',familiarLanguages:[{name:'English',level:'C2'},{name:'Spanish',level:'B1'}],interests:[  {
        icon:"airplane",
          label: "Travelling",
          state:'selected',
          notes:''
        },
        {
          icon:"kitchen",
          label: "Cooking",
          state:'selected',
          notes:''
        },
        {
          icon:"photo-camera",
          label: "Photography",
          state:'selected',
          notes:''
        }]},allInterests:iconsWithLabels};
    }

    updateMotherLanguage (e) {
      this.setState({updatingMotherLang:e.target.value});
    }

    updateNewFamLanguage (input) {
      this.setState({newFamLangInput:input,famLangToAdd:{...this.state.famLangToAdd, name: input}});
      console.log(this.state.famLangToAdd);
    }

    updateNewFamLangLevel (event, index, value) {
      if (value !== 'Level') {
        this.setState({newFamLangLevel:value,famLangToAdd:{...this.state.famLangToAdd, level: value}});
          console.log(this.state.famLangToAdd);
      }
    }

    addNewFamLang () {
      const userLangs = this.state.userInfo.familiarLanguages;
      userLangs.push(this.state.famLangToAdd);
      this.setState({userInfo:{...this.state.userInfo, familiarLanguages:userLangs},famLangToAdd:null,newFamLangLevel:'Level',newFamLangInput:''});
      console.log(this.state.newFamLangLevel);
      console.log(this.state.userInfo);
    }

    selectHobby (hobby) {
      this.setState({selectedHobby:hobby,updatingNotes:hobby.notes});
    }

    updateNotesField (e) {
      this.setState({updatingNotes:e.target.value});
    }

    saveNotes () {
      this.state.selectedHobby.notes = this.state.updatingNotes;
    }

    addInterest (interest) {
      const interestsState = this.state.userInfo.interests;
      if (interest.state === 'selected') {
        interest.state = 'unselected';
        // TODO This is not working now as the interest objects are not the same
        const idx = interestsState.indexOf(interest);
        console.log(interestsState[idx]);
        interestsState.splice(idx,1);
      }
      else {
        interest.state = 'selected';
        interestsState.push(interest);
      }
      this.setState({userInfo:{...this.state.userInfo, interests:interestsState}});
    }



}

export default MeStore;
