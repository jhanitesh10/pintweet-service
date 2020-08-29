module.exports = {
  Mutation: {
    addTweet(_, { input }) {
      // TODO: create object function
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
