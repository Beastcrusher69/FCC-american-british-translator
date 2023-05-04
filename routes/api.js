'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  
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

      console.log(locale);

      if(locale != "american-to-british" && locale != "british-to-american"){
        res.json({ error: 'Invalid value for locale field' });
        return;
      }

      let translation;

      if(locale == "american-to-british"){
        translation = translator.americanToBritish(text);
      }
      else{
        translation = translator.britishToAmercian(text); 
      }


      if(translation === text){
       translation = "Everything looks good to me!";
      }

      console.log(text);
      console.log(translation);
      
      res.json({
        text , translation
      });
    });
};
