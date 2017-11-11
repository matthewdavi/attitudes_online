const mongoose = require('mongoose');
let tweetSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  url: {
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
let Tweet = module.exports = mongoose.model('Tweet', tweetSchema);