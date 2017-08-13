const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

//can add and subtract properties as we please
const userSchema = new Schema({
  googleID: String,
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

//mongoose, i want a new collection called userSchema
//if already exist, will not overwrite
mongoose.model('users', userSchema);
