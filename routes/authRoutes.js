const passport = require('passport');

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
      console.log("Update in AuthRoutes");
      res.send(req.user);
  });




  // app.post('/api/login', function(req, res, next ){
  //     passport.authenticate('login', function(err, user, info) {
  //       if (err) { return next(err) }
  //       if (!user)
  //       {
  //         res.status(500);
  //         res.json({message: "Failed Login"});
  //         return;
  //       }
  //
  //       return res.json({message:"Successful Login", email: req.user.email, password:req.user.password});
  //     })(req, res, next);
  // });

};


//   app.post('/api/createaccount', function(req, res, next ){
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return next(err) }
//       if (!user)
//       {
//         res.status(401);
//         res.end(info.message);
//         return;
//       }
//
//       return res.json(user);
//     })(req, res, next);
// });
