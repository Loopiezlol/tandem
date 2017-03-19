const User = require('../models/user');
const mongoose = require('mongoose');
const Language = require('../models/language');

module.exports = {
  populateDB(n) {
    const ObjectId = mongoose.Types.ObjectId;
    const interests = [...Array(12).keys()].map(i => ({ name: `interest_${i}`, notes: 'BLAH!' }));
    const someLanguages = ['58cec30e9e85e938b3ac466d',
      '58cec30e9e85e938b3ac466e',
      '58cec30e9e85e938b3ac4670',
      '58cec30e9e85e938b3ac466f',
      '58cec30e9e85e938b3ac4671',
      '58cec30e9e85e938b3ac4672',
      '58cec30e9e85e938b3ac4673',
      '58cec30e9e85e938b3ac4674',
      '58cec30e9e85e938b3ac4675',
      '58cec30e9e85e938b3ac4676',
      '58cec30e9e85e938b3ac4677',
      '58cec30e9e85e938b3ac467a',
      '58cec30e9e85e938b3ac467b',
      '58cec30e9e85e938b3ac467c',
      '58cec30e9e85e938b3ac4679',
      '58cec30e9e85e938b3ac467e',
      '58cec30e9e85e938b3ac467d',
      '58cec30e9e85e938b3ac4678',
      '58cec30e9e85e938b3ac4680',
      '58cec30e9e85e938b3ac4681',
      '58cec30e9e85e938b3ac467f',
      '58cec30e9e85e938b3ac4683',
      '58cec30e9e85e938b3ac4682',
      '58cec30e9e85e938b3ac4684',
      '58cec30e9e85e938b3ac4685',
      '58cec30e9e85e938b3ac4687',
      '58cec30e9e85e938b3ac4688',
      '58cec30e9e85e938b3ac4689',
      '58cec30e9e85e938b3ac468a',
      '58cec30e9e85e938b3ac4686',
      '58cec30e9e85e938b3ac468b'];
    [...Array(n).keys()].forEach((i) => {
      User.create({
        username: `user${i}`,
        gender: ['M', 'F'][Math.floor(Math.random() * 2)],
        mainLanguage: someLanguages[Math.floor(Math.random() * 9)],
        wantsToLearn: [
          {
            languageId: someLanguages[Math.floor(Math.random() * 9)],
          // levelId:
          },
          {
            languageId: someLanguages[Math.floor(Math.random() * 9)],
          //
          },
          {
            languageId: someLanguages[Math.floor(Math.random() * 9)],
          //
          }],
        interests: [interests[Math.floor(Math.random() * 12)], interests[Math.floor(Math.random() * 12)]],
      });
    });
  },
  populateDBwithLanguages() {
    const langs =
    `Chinese,CN
English,GB
Spanish,ES
Arabic,SA
Bengali,IN
Hindi,SG
Russian,RU
Portuguese,PT
Japanese,JP
German,DE
Javanese,ID
Korean,KR
French,FR
Turkish,TR
Vietnamese,VN
Cantonese,PH
Italian,IT
Urdu,AF
Polish,PL
Ukrainian,UA
Persian,IR
Hakka,BN
Romanian,RO
Bhojpuri,NP
Azerbaijani,SY
Hausa,SD
Burmese,BD
Dutch,NL
Bulgarian,BG
Greek,GR
Serbia,SR`.split(/\n/);
    langs.forEach((x) => {
      const line = x.split(',');
      Language.create({
        name: line[0],
        abbreviation: line[1],
      });
    });
  },
};
