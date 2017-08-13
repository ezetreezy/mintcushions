//common js modules import
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


//(function)run mongoose to create schema, models, etc..
require('./models/User');
//(function)does not need to return anything just run the function
require('./services/passport');
//set up config that will listen to requests from nodeJS
mongoose.connect(keys.mongoURL);

const app = express();

//middleware (handle something) before sent to route handlers
//cookieSession processes req and populates req.id and passes over to passport
//then to route handlers () ->
//limited to 4000bytes or 4K KB
app.use(
  cookieSession ({
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

//runtime env variable from deployment + our dev port
const PORT = process.env.PORT || 8080;
app.listen(PORT);
