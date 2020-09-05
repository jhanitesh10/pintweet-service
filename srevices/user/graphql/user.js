const { gql } = require("apollo-server");
const typeDefs = gql`
type User @key(fields: "id") {
   id : ID!
   name : String!
   created: String!
   updated: String!
}
type Query {
  getUser(id: ID!): User!
}
type Mutation {
  createUser(id: ID!, name: String!): User!
}
`;

module.exports = typeDefs;
