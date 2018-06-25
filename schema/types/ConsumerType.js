const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const ConsumerTopicType = require('./ConsumerTopicType');

const ConsumerType = new GraphQLObjectType({
  name: 'Consumer',
  fields: {
    group: { type: GraphQLString },
    topics: {
      type: new GraphQLList(ConsumerTopicType),
      resolve: (consumer, args, context) => {
        return context.cluster.fetchConsumerTopics(consumer.group);
      }
    }
  }
});

module.exports = ConsumerType;
