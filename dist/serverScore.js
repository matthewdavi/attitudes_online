async function serverScore(req, res) {
  const user = req.params.user.toLowerCase();
  const dataBase = require('./db.js');
  const grabScore = require('./grabScore');
  const userData = await grabScore(user);
  if (userData !== undefined) {
    const data = `{"user": "${user}", "score": ${userData.score}, "mostNegative": "${userData.min}", "mostPositive": "${userData.max}", "avi": "${userData.avi}", "name": "${userData.name}"}`;
    res.send(data);
  }
}
module.exports = serverScore;