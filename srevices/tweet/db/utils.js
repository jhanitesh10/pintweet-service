// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
module.exports = initializeEnv = () => {
  const tweetTable= process.env.TWEET_TABLE || "Tweet-demo";
  AWS.config.update({
    region: process.env.AWS_REGION_NAME || "ap-northeast-2",
  });
  DDB = new AWS.DynamoDB();
  return {
    DDB,
    tweetTable,
  };
};
