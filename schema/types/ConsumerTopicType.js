const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const GraphQLJSON = require('graphql-type-json');

const ConsumerTopicType = new GraphQLObjectType({
  name: 'ConsumerTopic',
  fields: {
    name: { type: GraphQLString },
    offsets: {
      type: GraphQLJSON,
      resolve: (topic, args, context) => (
        context.cluster.getConsumerOffsets(context.group, topic.name)
      )
    }
  }
});

module.exports = ConsumerTopicType;
