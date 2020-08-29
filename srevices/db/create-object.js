// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
const initializeEnv = require('./utils');
module.exports = async function createObject(
  object,
): Promise<StoredObjectResult<T>> {
  const {
    DDB,
    tweetTable,
  } = initializeEnv();
  const now = new Date().toISOString();
  const row = {
    ...object,
    dtC: now,
    dtU: now,
  };
  const item = AWS.DynamoDB.Converter.marshall(row);
  const params = {
    TableName: objectStoreTableName,
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