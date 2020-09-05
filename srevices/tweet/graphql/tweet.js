const { gql } = require("apollo-server");

const typeDefs = gql`
  input TweetInput {
    text: String!
    userId: ID!
  }
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
    startCursor: String
  }
  type Tweet {
    id: ID!
    userId: ID!
    text: String!
    user: User!
    created: String!
    updated: String!
  }
  type TweetConnection {
    nextToken: String
    edges: [TweetEdge!]
    pageInfo: PageInfo!
  }
  type TweetEdge {
    cursor: String!
    node: Tweet 
  }
  extend type User @key(fields : "id") {
    id : ID! @external
  }
  type Query {
    listTweet(first: Int, after: String): TweetConnection! 
  }
  type Mutation {
    addTweet(id: ID!, input: TweetInput!): Tweet!
  }
`;

module.exports = typeDefs;
