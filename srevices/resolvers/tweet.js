const addTweet = require('../module/add-tweet');
module.exports = {
  Mutation: {
    async addTweet(_, { id, input}) {
     const result = await addTweet(id, input); 
     return result;
    },
  },
  Query: {
    listTweet(_, { input }, { models }) {
      // TODO: Get it form server
      const tweet = {
        nextToken: "token",
        edges: [{
          cursor: "cursor",
          node:  {
            id: "id",
            text: "tweet",
            userName: "Nitesh",
          }
        }],
        pageInfo: {
          hasNextPage:  false,
          endCursor:  "cursor",
          startCursor:  "cursor"
        } 
      };
      console.log(tweet);
      return tweet;
    },
  },
};
