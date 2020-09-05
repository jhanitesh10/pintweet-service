const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require('@apollo/federation');
const typeDefs = require("./graphql/tweet");
const resolvers = require("./resolvers/tweet");
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});
server.listen(4009).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
