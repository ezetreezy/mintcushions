const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

//can add and subtract properties as we please
const userSchema = new Schema({
  googleID: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  enabled: {type: Boolean, default: false},
  teamon: {type: String, default: "Team I am on"},
  teamsupport: {type: String, default: "Team I Support"},
  favboots: {type: String, default: "Favorite Boots"},
  footballpos: {type: String, default: "Football Position"},
  handle: {type: String, default: "My Handle"},
  location: {type: String, default: "Location"},
  about: {type: String, default: "Quick description of your play style"},
  numberofReviews: {type: Number, default: 0},
  avatar: {type: String, default: "sample"}
});


//generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//mongoose, i want a new collection called userSchema
//if already exist, will not overwrite
mongoose.model('users', userSchema);
