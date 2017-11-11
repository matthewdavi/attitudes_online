const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  mostNegative: {
    type: String,
    required: true
  },
  mostPositive: {
    type: String,
    required: true
  },
  avi: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('User', userSchema);