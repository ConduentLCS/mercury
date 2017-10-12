const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    offset: { type: GraphQLString },
    partition: { type: GraphQLInt },
    timestamp: { type: GraphQLString },
    data: { type: GraphQLString }
  }
});

module.exports = MessageType;
