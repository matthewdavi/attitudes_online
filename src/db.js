const dataBase = function(data) {
  const User = require('./user.js');
  const newUser = new User(JSON.parse(data));
  newUser.save();
};
module.exports = dataBase;
