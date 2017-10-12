const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const TopicType = new GraphQLObjectType({
  name: 'Topic',
  fields: {
    name: { type: GraphQLString },
    offset: { type: GraphQLInt },
    partitions: { type: GraphQLInt }
  }
});

module.exports = TopicType;
