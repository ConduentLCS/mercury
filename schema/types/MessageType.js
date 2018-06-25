const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    topic: { type: GraphQLString },
    offset: { type: GraphQLString },
    partition: { type: GraphQLInt },
    highWaterOffset: { type: GraphQLInt },
    key: { type: GraphQLString },
    value: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }
});

module.exports = MessageType;
