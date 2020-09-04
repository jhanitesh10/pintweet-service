const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/user");
const resolvers = require("./resolvers/user");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
