const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

//ROUTE HANDLER (BILLING)

//HTTPrequest, middlware, request handling function
//when a request comes in, express will invoke it on its own
//post/get can take in a random amount of middleware arguments
//eventually one function must process the request with a response

module.exports = app => {

    app.post('/api/payment', requireLogin, async (req,res) => {

      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: 'enable full features',
        source: req.body.id
      });

        ///get current user model(request)
        //req.user.credits += 5;
        req.user.enabled = true;
        const user = await req.user.save();

        res.send(user);
    });
};
