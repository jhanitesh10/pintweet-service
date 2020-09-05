
// TODO: Use types[TypeScript]
// TODO: Setup babel & jestt
// TODO: Setup EsList 
const AWS = require('aws-sdk');
module.exports = async function listTweet(
  typ,
  reqAtts,
  first, 
  after,
){
  const {
    DDB,
    tweetTable,
  } = initializeEnv();
  const firstLimit = first || 2;
  let keyExpression = 'typ = :t';
  const attrValues = {
    ':t': {
      S: typ,
    },
  };
  let token=null;
  if(after){
    const [idKey, typKey] = after.split("#");
    token = AWS.DynamoDB.Converter.marshall({id: idKey, typ: typKey});
  }
  console.log(token);
  let params = {
    TableName: tweetTable,
    ExclusiveStartKey: token,
    KeyConditionExpression: keyExpression,
    ExpressionAttributeValues: attrValues,
    IndexName: 'CONTEXT',
    Limit: firstLimit,
    ConsistentRead: false,
    ReturnConsumedCapacity: 'NONE',
    ProjectionExpression: reqAtts,
  };
  try {
    // TODO: Handle 1MB size limit
    // TODO: Move converter to common place
    let nextToken = null;
    const {LastEvaluatedKey, Items, Count}= await DDB.query(params).promise();
    const items =  Items.map(item => AWS.DynamoDB.Converter.unmarshall(item));
    if(LastEvaluatedKey){
      const {typ: {S: typKey}, id: {S: idKey}} = LastEvaluatedKey;
      nextToken = `${idKey}#${typKey}`
    } 
    return {nextToken, items}; 
  } catch (e) {
    console.log('Error get context objects:', e);
    throw e;
  }
}
