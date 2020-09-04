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
    userTable,
  } = initializeEnv();
  const {
    id,
    name,
  } = object;
  const now = new Date().toISOString();
  const row = {
    id, 
    uN: name,
    dtC: now,
    dtU: now,
  };
  const item = AWS.DynamoDB.Converter.marshall(row);
  const params = {
    TableName: userTable,
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