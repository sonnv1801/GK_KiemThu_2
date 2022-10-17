const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  avatar: {
    type: String,
  },
  username: {
    type: String,
    max: 30,
    unique: true,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  sex: {
    type: Number,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
