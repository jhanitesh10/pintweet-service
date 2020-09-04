const createUser = require('../db/create-user');
const getUser = require('../db/get-user');
module.exports = {
  User : {
    async __resolveReference(object) {
        return await getUser(object.userId);
    }
  },
  Mutation: {
    async createUser(_, { id, name}) {
      console.log("INside create", id, name);
     const {dtC, dtU}= await createUser({id, name}); 
     return {
        id,
        name,
        created: dtC,
        updated: dtU,
     };
    },
  },
  Query: {
    async getUser(_, { id },) {
      const {uN, dtC, dtU}= await getUser(id);
      return {
        id,
        name: uN,
        created: dtC,
        updated: dtU,
      };
    },
  },
};
