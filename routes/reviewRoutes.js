const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const randomstring = require('randomstring');
const Review = mongoose.model('reviews');
const Boot = mongoose.model('boots');

//req => incoming object coming in (all located on body)
//req.params are our wild cards
module.exports = app => {

  //get single review
  app.get('/api/reviews/:reviewID', async(req,res) => {

    try{
      const review = await Review.find({_reviewID: req.params.reviewID});

      if(review)
      res.send(review);
    } catch(err) {
      res.status(404).send(err);
    }

  });

  //get multiple reviews per boot
  app.get('/api/reviews/:bootBrand/:bootName/', async (req,res) => {

    try{
    const reviews = await Review.find( {bootname: req.params.bootName});

    if(reviews)
    res.send(reviews); }
    catch(err) {
    res.status(404).send(err);
  }
  });

  //get all reviews per user_id
  app.get('/api/user/reviews/', requireLogin, async (req,res) => {

    try{
    const reviews = await Review.find( {_user: req.user._id});

    if(reviews)
    res.send(reviews); }
    catch(err) {
    res.status(404).send(err);
  }
  });

  //post a review to a db
  app.post('/api/reviews', requireLogin, async (req, res) => {
      const { bootbrand, bootname, title, body, ratingOverall, ratingDurability,
              ratingTraction, ratingTouch, ratingProtection } = req.body;

      const _id = randomstring.generate({
                  length: 8,
                  charset: 'numeric'
                  });

      //instance of review in memory
      const review = new Review({
        bootbrand,
        bootname,
        _user: req.user.id,
        _reviewID: _id,
        reviewName: req.user.firstname + " " + req.user.lastname,
        title,
        body,
        ratingOverall,
        ratingDurability,
        ratingTraction,
        ratingTouch,
        ratingProtection,
        dateReviewed: Date.now()
      });

      //save
      try{
      const thereview = await review.save();
      req.user.numberofReviews += 1;
      //async and remember when we save user it
      //becomes stale so we use user model returned from save operation
      const user = await req.user.save();

      const boot = await Boot.findOne( {name: bootname});
      if(boot)
      {
        boot.reviewCount += 1;
        await boot.save();
      }

      //catch update user model and send back
      res.send(thereview);
      } catch(err) {
        res.status(422).send(err);
      }
  });


  ///edit a review
  app.post('/api/reviews/edit', requireLogin, async (req, res) => {
      const { bootbrand, bootname, title, body, ratingOverall, ratingDurability,
              ratingTraction, ratingTouch, ratingProtection, _reviewID } = req.body;


      try{
        const review = await Review.findOne({_reviewID: _reviewID});

        if(review){

          review.title = title;
          review.body = body;
          review.ratingOverall = ratingOverall;
          review.ratingDurability = ratingDurability;
          review.ratingTouch = ratingTouch;
          review.ratingTraction = ratingTraction;
          review.ratingProtection = ratingProtection;
          review.dateReviewed = Date.now();

          const newReview = await review.save();

          res.send(newReview)
          }  }
          catch(err){
            res.status(422).send(err);
          }
  });

    app.delete('/api/delete/:bootname/:id', requireLogin, async (req, res) => {

            Review.deleteOne({_reviewID: req.params.id}, (err, results) => {

              if(err)
              res.status(422).send(err);
            });

            try{
            const boot = await Boot.findOne({name: req.params.bootname});
            if(boot)
            {
              boot.reviewCount += 1;
              await boot.save();
            }

            req.user.numberofReviews -= 1;
            const user = await req.user.save();

            res.send(user);
            }
            catch(err){
              res.status(422).send(err);
            }

    });

};
