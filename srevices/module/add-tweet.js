const createObject = require('../db/create-object');

module.exports = async function addTweet(id, input){
  const { dtC, dtU }= await createObject({id, ...input});
  return {
    id,
    ...input,
    created: dtC, 
    udpaated: dtU
  }
}