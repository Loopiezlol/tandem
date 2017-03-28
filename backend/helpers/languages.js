module.exports =
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
Serbia,SR`
.split(/\n/).map((x) => {
  const line = x.split(',');
  return {
    name: line[0],
    abbreviation: line[1],
  };
});
