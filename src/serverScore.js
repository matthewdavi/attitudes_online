//@flow
async function serverScore(req: Object, res: Object) {
  const user = req.params.user;
  const grabScore = require('./grabScore');
  console.log('making request');
  const userScore = await grabScore(user);
  if (userScore !== undefined) {
    //res.send(`{"user": "${user}", "score": ${userScore.score} } `);
    res.send("hello");
  }
}
module.exports = serverScore;
