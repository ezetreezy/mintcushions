//key.js - determine which prod vs dev
if(process.env.NODE_ENV === 'production')
{
  //in production
  module.exports = require('./prod');
}
else
{
  //in development
  module.exports = require('./dev');
}
