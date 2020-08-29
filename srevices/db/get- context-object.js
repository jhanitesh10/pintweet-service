
// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
module.exports = async function getContextObjects(
  typ,
  reqAtts,
  first, 
  after,
){
  const {
    DDB,
    tweetTable,
  } = initializeEnv();
  console.log(typ, reqAtts, first, after);
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
    Limit: first? first : null,
    ConsistentRead: false,
    ReturnConsumedCapacity: 'NONE',
    ProjectionExpression: reqAtts,
  };
  try {
    // TODO: Handle 1MB size limit
    // TODO: Move converter to common place
    const result = await DDB.query(params).promise();
    console.log(result);
    const items =  result.Items.map(item => AWS.DynamoDB.Converter.unmarshall(item));
    return {nextToken: result.nextToken, items}; 
  } catch (e) {
    console.log('Error get context objects:', e);
    throw e;
  }
}
