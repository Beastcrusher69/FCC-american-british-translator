'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  console.log(translator);
  console.log(translator.americanToBritish);
  

  app.route('/api/translate')
    .post((req, res) => {

      let { text , locale } = req.body ; 

      if(!locale || text == undefined){
        res.json({ error: 'Required field(s) missing' });
        return;
        
      }
      if(text == ""){
        res.json({"error":"No text to translate"});
        return;
      }

      if(locale != "american-to-british" && locale != "british-to-american"){
        res.json({ error: 'Invalid value for locale field' });
        return;
      }

      let translation;

      if(locale == "american-to-british"){
        translation = translator.americanToBritish(text);
      }
      else{
        translation = translator.britishToAmerian(text); 
      }


      if(translation === text){
        res.send("Everything looks good to me!");
        return ;
      }
    
      res.json({
        text , translation
      });
    });
};
