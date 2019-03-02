//common js modules import
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const options = {
  useMongoClient: true
};

//(function)run mongoose to create schema, models, etc..
require('./models/User');
require('./models/Review');
require('./models/Boot');
//(function)does not need to return anything just run the function
require('./services/passport');
//set up config that will listen to requests from nodeJS
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURL, options);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middleware (handle something) before sent to route handlers
//cookieSession processes req and populates req.id and passes over to passport
//then to route handlers () ->
//limited to 4000bytes or 4K KB
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
//end middleware

//we are returning a function from authRoutes(module export)
//immediatly call the function with the app object IIFE
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/reviewRoutes')(app);
require('./routes/bootRoutes')(app);
//express should be ready for:
//there are some routes express is ready for
//there are even more routes that express should say hey here is my index.html
//there are more routes that want to access specific files like index.js
if (process.env.NODE_ENV === 'production') {
  //production code | express serves up assets
  //main.js or main.css file,etc.. -> look into our client/build dir
  app.use(express.static('client/build'));

  //express will serve up index.html if route is not recognized(not defined in our routehandlers)
  //kick user to client side of our app(React Router handles the rest)
  //must catch anything that falls through
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//runtime env variable from deployment + our dev port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('App running on port', PORT);
});
