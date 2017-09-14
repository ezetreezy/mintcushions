

module.exports = (req, res, next) => {
  //if error, stop the chain
  if(!req.user){
    return res.status(401).send({error: 'You must log in!'});
  }

  //success -> pass to other middleware chain
  next();
};
//next is a function that passes the req to the next middleware in the
//chain of middlewares

//res.status stops the middleware chain and says something is wrong
//and does not call next
