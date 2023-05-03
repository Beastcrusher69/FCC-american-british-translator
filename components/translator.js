const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  americanToBritish(text) {

    let AToBDict = { ...americanOnly, ...americanToBritishSpelling };
    let AToBTitles = americanToBritishTitles;

    return this.translat(text, AToBDict, AToBTitles);
  }

  britishToAmerian(text) {

    let BritishToAmericanSpelling = objectFlip(americanToBritishSpelling)
    BToADict = { ...britishOnly, ...BritishToAmericanSpelling };
    BToATitles = ObjectFlip(americanToBritishTitles);

    return this.translat(text, BToADict, BToATitles);

  }

  translat(text, dict, titles) {
    let textLowerCase = text.toLowerCase();
    let translated;
    const timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g;

    Object.entries(titles)
      .map(([key, value]) => {
        if (textLowerCase.includes(key)) {
          translated = text.replace(new RegExp(key, "gi"), `<span class="highlight">${this.capitalizeFirstLetter(value)}</span>`) || text;
        }
      })

    translated = translated || text;

    const changeTime = textLowerCase.match(timeRegex);
    if (changeTime) {
      changeTime.map(time => {
        translated = translated.replace(time, `<span class="highlight">${time.replace(':', '.')}</span>`) || text;
      })
    }

    Object.entries(dict).map(([key, value]) => {

      if (new RegExp('${key}', 'gi').test(textLowerCase)) {
        translated = translated.replace(key, '<span class="highlight">${value}</span>') || text;
      };

      return translated || text;
    })
  }

  objectFlip(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[value] = key;
    }, {});
  }

  capitalizeFirstLetter(text) {
    let arr = text.split('');

    arr[0].toUpperCase();

    return arr.join();
  }

}

module.exports = Translator;