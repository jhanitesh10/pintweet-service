// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
import AWS from 'aws-sdk';
const initializeEnv = () => {
  const tweetTable= env('TWEET_TABLE');
  AWS.config.update({
    region: process.env.AWS_REGION,
  });
  DDB = new AWS.DynamoDB();
  return {
    DDB,
    tweetTable,
  };
};

export {
  initializeEnv,
}