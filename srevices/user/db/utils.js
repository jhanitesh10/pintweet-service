// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
module.exports = initializeEnv = () => {
  const userTable = process.env.USER_TABLE || "User-demo";
  AWS.config.update({
    region: process.env.AWS_REGION_NAME || "ap-northeast-2",
  });
  DDB = new AWS.DynamoDB();
  return {
    DDB,
    userTable,
  };
};
