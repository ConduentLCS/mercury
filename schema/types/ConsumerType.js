const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const TopicType = require('./TopicType');

const ConsumerType = new GraphQLObjectType({
  name: 'Consumer',
  fields: {
    group: { type: GraphQLString },
    topicCount: {
      type: GraphQLInt,
      resolve: consumer => consumer.topics.length
    },
    topics: { type: new GraphQLList(TopicType) }
  }
});

module.exports = ConsumerType;
