const addTweet = require('../module/add-tweet');
const listTweet = require('../module/list-tweet');
module.exports = {
  Mutation: {
    async addTweet(_, { id, input}) {
     const result = await addTweet(id, input); 
     return result;
    },
  },
  Query: {
    async listTweet(_, { first, after}, { models }) {
      const result = await listTweet(first, after);
      return result;
    },
  },
};
