const passport = require('passport');

///ROUTE HANDLER
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
  app.get('/auth/google/callback', passport.authenticate('google'));

  //kills cookie and logs out
  app.get('/api/logout', (req,res) => {
    req.logout();
    res.send(req.user); //should recieve nothing if successful
  });

  //get cookie from user and respond with his/her info
  app.get('/api/active_user', (req, res) => {
    res.send(req.user);
  });



};
