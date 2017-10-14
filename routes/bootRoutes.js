const mongoose = require('mongoose');
const Boot = mongoose.model('boots');

//req => incoming object coming in (all located on body)
//req.params => incoming wild cards
module.exports = app => {


  app.get('/api/boots/:bootBrand/:bootName/', async (req, res) => {

      //returns object
      try{
      const boot = await Boot.findOne( {name: req.params.bootName});

      if(boot)
      res.send(boot); }
      catch(err) {
      res.status(404).send(err);
    }

  });

  app.get('/api/boots/:bootBrand/', async (req, res)=> {

      //returns array
      try{
      const boots = await Boot.find( {brand: req.params.bootBrand});

      if(boots)
      res.send(boots); }
      catch(err){
        res.status(404).send(err);
      }
  });

};
