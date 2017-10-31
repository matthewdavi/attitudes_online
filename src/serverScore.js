//@flow
async function serverScore(req: Object, res: Object) {
  const user = req.params.user;
  const grabScore = require('./grabScore');
 const userData = await grabScore(user);
  if (userData !== undefined) {
    res.send(`{"user": "${user}", "score": ${userData.score}, "mostNegative": "${userData.min}", "mostPositive": "${userData.max}", "avi": "${userData.avi}", "name": "${userData.name}"}`);
  }
}
module.exports = serverScore;
