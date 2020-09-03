const getContextObjects = require('../db/get- context-object');

module.exports = async function listTweet(first, after){
  const {items}= await getContextObjects('TWEET', "id, t, uN, dtC, dtU", first, after);
  const edges = items.map(({id, uN, t, dtU, dtC})=> ({
    cursor: `${id}-C`, 
    node: {
      id, 
      userName: uN, 
      text: t, 
      created: dtC, 
      updated:dtU
    }
  }));
  const tweet = {
    nextToken: "token",
    edges,
      pageInfo: {
      hasNextPage:  false,
      endCursor:  "cursor",
      startCursor:  "cursor"
    } 
  };
  return  tweet;
}