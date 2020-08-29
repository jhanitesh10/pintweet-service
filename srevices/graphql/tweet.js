const { gql } = require("apollo-server");

const typeDefs = gql`
  input TweetInput {
    text: String!
    userName: String!
  }
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
    startCursor: String
  }
  type Tweet {
    id: ID!
    text: String!
    userName: String!
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
  type Query {
    listTweet: TweetConnection! 
  }
  type Mutation {
    addTweet(id: ID!, input: TweetInput!): Tweet!
  }
`;

module.exports = typeDefs;