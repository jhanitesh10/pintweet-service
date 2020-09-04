const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require('@apollo/federation');
const typeDefs = require("./graphql/user");
const resolvers = require("./resolvers/user");
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});
server.listen(4001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
