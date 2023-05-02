const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

//   americanToBritish{
//     k
//   }

//   britishToAmerian{
    
//   }

  translat(text, dict ,titles){
    let textLowerCase = text.toLowerCase;
    let translate ;
    const timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g;

     Object.entries(titles) 
            .map(([key, value]) => {
                if (textLowerCase.includes(key)) {
                    translated = text.replace(new RegExp(key, "gi"), `<span class="highlight">${this.capitalizeFirstLetter(value)}</span>`) || text;
                }
            })

        translated = translated || text;

        if (changeTime) {
            changeTime.map(time => {
                translated = translated.replace(time, `<span class="highlight">${time.replace(':', '.')}</span>`) || text;
            })
        }
  }

//   objectFlip{
    
//   }

//   capitalizeFirstLetter{
    
//   }
  
}

module.exports = Translator;