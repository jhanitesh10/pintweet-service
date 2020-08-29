// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
const initializeEnv = require('./utils');

module.exports = async function getObject(
  id,
  reqAtts,
) {
  const {
    DDB,
    tweetTable,
  } = initializeEnv();
  const keyExpression = {
    id,
  };
// TODO: Move conveter function  into util & re-use it
  const params = {
    TableName: tweetTable,
    Key: AWS.DynamoDB.Converter.marshall(keyExpression),
    ConsistentRead: false,
    ProjectionExpression: reqAtts,
  };
  try {
    const result = await DDB.getItem(params).promise();
    const item = AWS.DynamoDB.Converter.unmarshall(result.Item);
    return item;
  } catch (e) {
    console.log('Error:', e);
    throw e;
  }
}