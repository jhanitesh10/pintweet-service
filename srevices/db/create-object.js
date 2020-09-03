// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
const initializeEnv = require('./utils');
module.exports = async function createObject(
  object,
){
  const {
    DDB,
    tweetTable,
  } = initializeEnv();
  const {
    id,
    userName,
    text,
  } = object;
  const now = new Date().toISOString();
  const row = {
    id, 
    uN: userName,
    t: text,
    typ: 'TWEET',
    dtC: now,
    dtU: now,
  };
  console.log(row);
  const item = AWS.DynamoDB.Converter.marshall(row);
  const params = {
    TableName: tweetTable,
    Item: {
      ...item,
    },
  };
  try {
    await DDB.putItem(params).promise();
  } catch (e) {
    throw new Error(`Create object error: ${params}`);
  }
  return row;
}