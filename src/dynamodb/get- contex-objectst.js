
// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
module.exports = async function getContextObjects(
  typ,
  reqAtts,
){
  const {
    DDB,
    tweetTable,
  } = initializeEnv();

  let keyExpression = 'typ = :t';
  const attrValues = {
    ':t': {
      S: typ,
    },
  };

  let params = {
    TableName: tweetTable,
    KeyConditionExpression: keyExpression,
    ExpressionAttributeValues: attrValues,
    IndexName: 'Context',
    ConsistentRead: false,
    ReturnConsumedCapacity: 'NONE',
    ProjectionExpression: reqAtts,
  };

  try {
    // TODO: Handle 1MB size limit
    // TODO: Move converter to common place
    const result = await ddb.query(params).promise();
    const items = AWS.DynamoDB.Converter.unmarshall(result.Items);
    return items; 
  } catch (e) {
    console.log('Error get context objects:', e);
    throw e;
  }
}
