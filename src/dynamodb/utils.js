// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
module.exports = initializeEnv = () => {
  const tweetTable= env('TWEET_TABLE');
  AWS.config.update({
    region: process.env.AWS_REGION_NAME,
  });
  DDB = new AWS.DynamoDB();
  return {
    DDB,
    tweetTable,
  };
};
