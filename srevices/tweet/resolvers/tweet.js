const addTweet = require('../db/add-tweet');
const listTweet = require('../db/list-tweet');
module.exports = {
  Mutation: {
    async addTweet(_, { id, input}) {
     const {t, uId, dtC, dtU} = await addTweet({id, input}); 
     return {id, text: t, userId: uId, created:dtC, updated:dtU };
    },
  },
  Query: {
    async listTweet(_, { first, after}, { models }) {
      const {items, nextToken}= await listTweet('TWEET', "id, uId, uN, t, dtC, dtU", first, after);
      const edges = items.map(({id, uId, uN, t, dtU, dtC})=> ({
        cursor: `${id}-C`, 
        node: {
          id, 
          userId: uId, 
          text: t, 
          created: dtC, 
          updated:dtU,
          user(tweet) {
            console.log("##############", tweet);
            return { __typename: "User", id: "user-1"};
          }
        }
      }));
      const tweet = {
        nextToken,
        edges,
          pageInfo: {
          hasNextPage:  false,
          endCursor:  "cursor",
          startCursor:  "cursor"
        } 
      };
      return  tweet;
    },
  },
};
