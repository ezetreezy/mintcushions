//common js modules import
const express = require('express');
//set up config that will listen to requests from nodeJS
const app = express();
//route handler for HTTP requests from Express
app.get('/', (req, res) => {
  res.send({Boot: "Review App"});
});
//runtime env variable from deployment + our dev port
const PORT = process.env.PORT || 8080;
app.listen(PORT);
