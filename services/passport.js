const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');



//new instance of google passport strategy
//passport will use our google strategy
//known as strategy 'google' in passport
passport.use(new GoogleStrategy({
  //configuration options
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
  },
  async (accessToken, refreshToken, profile, done) =>
  {
        //async action // returns a promise (how we deal with async code)
        const existingUser = await User.findOne({googleID: profile.id});
        if(!existingUser)
        {
        //came back null (id did not exist)
        //else create new model instance (represent same record)
        const user = await new User({googleID: profile.id, email: profile.emails[0].value,
                                    firstname: profile.name.givenName,
                                    lastname: profile.name.familyName}).save(); //save previous instance

        done(null, user); //(user)get back a more complete second instance (represent same record)
        }
        else //already have a user in DB with id
        done(null, existingUser);
    }
  )
);

//create new user passport strategy
passport.use('create', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {

    User.findOne({ email:  username }, function(err, user)
    {
    if (err)
    return done(err);

    if (user)
    return done(null, false);
    else
    {
        //create email and hash password before entry into db
        var user = new User();
        user.email = username;
        user.password = user.generateHash(password);
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.save(function(err) {
                if (err)
                throw err;

                return done(null, user);
                });

              }

            })
        })
        );

  //not using async because i will not be able to change the const
  //user object //password email field being tricked for only 1 input
  passport.use('emailcheck', new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'email'
      },
        function(username, password, done) {


          console.log("Passport  Email");
          User.findOne({ email:  username }, function(err, user)
          {

          if (err)
          return done(err);

          if (user)
            return done(null, false);
          else
          {
            var user = new User();
            user.email = username;
            done(null, user);
          }

        })
    })
    );

    //login strategy
    passport.use('login', new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
            function(username, password, done) {

            User.findOne({ email:  username }, function(err, user)
            {

            if (err)
            return done(err);

            //invalid email
            if (!user)
            return done(null, false);

            //invalid password
            if(!user.validPassword(password))
            return done(null, false);

            //success
            done(null, user);
          })
      })
      );

      //updating user information
      passport.use('update', new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'email',
          passReqToCallback: true
        },
        function(req, username, password, done) {


              console.log("In Passport  Update");
              console.log(req.user.id);
              User.findById(req.user.id, function (err, user) {

              if (err)
              return done(err);

              //invalid email || userid
              if (!user)
              return done(null, false);
              else {
                    //success and start updating

                    //attributes
                    if(req.body.favboots)
                    user.favboots = req.body.favboots;

                    if(req.body.footballpos)
                    user.footballpos = req.body.footballpos;

                    if(req.body.location)
                    user.location = req.body.location;

                    if(req.body.teamon)
                    user.teamon = req.body.teamon;

                    if(req.body.teamsupport)
                    user.teamsupport = req.body.teamsupport;

                    //personal
                    if(req.body.firstname)
                    user.firstname = req.body.firstname;

                    if(req.body.lastname)
                    user.lastname = req.body.lastname;

                    if(req.body.handle)
                    user.handle = req.body.handle;

                    if(req.body.description)
                    user.about = req.body.description;

                    //settings
                    if(req.body.newemail)
                    user.email = req.body.newemail;

                    //if new password was provided
                    if(req.body.password)
                    {
                      //check to make sure it is correct
                      if(!user.validPassword(req.body.password))
                      return done(null, false);

                      //check if newpassword was provided then hash it
                      if(req.body.newpassword)
                      user.password = user.generateHash(req.body.newpassword);
                    }

                    user.save(function(err) {
                            if (err)
                            throw err;

                            return done(null, user);
                            });
                  }
        })
    })
);


//serialize & deserialize ENCODES/DECODES userID into the cookie
//USER.ID is a unique identifier generated by MONGO not the
//googleID created by googleAuth

//user is what we pulled out of the database after auth
passport.serializeUser((user, done) => {
  //callback for passport paramters(errors, identifying info)
  //userid was generated by mongo in our DB
  done(null, user.id);
});

//get it->turn into mongoose instance
passport.deserializeUser((id, done)=>{
  //query DB by userID and if found return our user mongoose instance
  User.findById(id).then(user => {
    done(null, user);
  })
});

// //create new user passport strategy ES7
// passport.use('create', new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//       async (username, password, done) => {
//         const user = await User.findOne({ email: username });
//         if (user)
//         return done(null, false);
//         else
//         {
//           //var hashedPassword = User.generateHash(password);
//           //console.log("hashed pass: " + hashedPassword);
//           const user = await new User({email: username , password: password}).save();
//           console.log(user.generateHash(password));
//           done(null, user);
//         }
//       })
//   );
