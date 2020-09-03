const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/tweet");
const resolvers = require("./resolvers/tweet");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
