const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const cloudinary = require('cloudinary');
const fs = require('fs');
const upload = require('../middleware/fileUpload');

cloudinary.config({
  cloud_name: 'mintcushions',
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecretKey
});

///ROUTE HANDLER (AUTHENTICATION)
//expressappobject.http request(path),
//let passport authenticate or respond

//exports function from this file
module.exports = (app) => {

  //authenticate user for first time
  //let passport authenticate and use strategy 'google'
  app.get('/auth/google', passport.authenticate('google', {
    //scope/permission = access we want (profile + email)
    scope: ['profile', 'email']
    })
  );

  //this will have our profile code
  //and passport needs to turn it into user profile credentials
  app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    });

  //kills cookie and logs out
  app.get('/api/logout', (req,res) => {
    req.logout();
    res.redirect('/');
  });

  //get cookie from user and respond with his/her info
  app.get('/api/active_user', (req, res) => {
    res.send(req.user);
  });

  //create user post request
  app.post('/api/createaccount', passport.authenticate('create'),
  (req, res) => {
    //res.json({message:"Success! Account Created", email: req.user.email, password:req.user.password});
    res.send(req.user);
  });

  //check if email is in use post request(redux form async request)
  app.post('/api/createaccount1', passport.authenticate('emailcheck'),
  (req, res) => {
    //res.json({message:"Success"});
    res.send(req.user);
  });

  //login passport strategy
  app.post('/api/login', passport.authenticate('login'),
  (req, res) => {
      //return res.json({message:"Successful Login", email: req.user.email, password:req.user.password});
      res.send(req.user);
  });

  app.post('/api/update', passport.authenticate('update'),
  (req, res) => {
      res.send(req.user);
  });

  app.post('/api/updateAvatar', upload.single('Avatar'), async(req,res) => {

        console.log("File", req.file);
        console.log("User", req.user.id);
        var results;

        cloudinary.uploader.upload(req.file.path, async (result, error) => {

          if(error)
          throw error;

          if(result)
          {
                    console.log("Result ", result);
                    results = result.public_id;

                    try{

                        const user = await User.findById(req.user.id);
                        if(user)
                        {
                          if(user.avatar !== 'sample')
                          cloudinary.uploader.destroy(user.avatar, function(error, result){console.log(result)});


                          //maybe can use set here beccause of just updating one instance
                          user.avatar = results;
                          const newuser = await user.save();
                          //catch update user model and send back

                          //check if file is in temp directory for uploaded files
                          fs.stat(req.file.path, (err, stat) => {

                            if(err === null)
                            {
                              console.log("File Exists and will begin deleting");
                              //delete file
                              fs.unlink('./' + req.file.path, (error) => {
                                    if(error)
                                    throw error;

                                    console.log('File Deleting completed');
                                });
                            }
                            else if(err.code === 'ENOENT')
                              console.log("file exists");
                            else
                              console.log("Some other error!");
                          });
                            res.send(newuser);
                        }

                    } catch(err) {
                        res.status(422).send(err);
                    }
          }

        });






  });

};
