const dataBase = function(req) {
  const mongoose = require('mongoose');
  const Article = require('./tweets.js');
  mongoose.connect('mongodb://localhost/nodekb', {
    useMongoClient: true
  });
  const db = mongoose.connection;
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });

  db.on('error', function(error) {
    console.log(error);
  });
};
module.exports = dataBase;
