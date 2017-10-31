const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const { withFilter } = require('graphql-subscriptions');
const config = require('config');

const ClusterType = require('./types/ClusterType');
const MessageType = require('./types/MessageType');


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    cluster: {
      type: ClusterType,
      args: {
        address: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, context) => {
        const cluster = context.manager.connectCluster(args.address);
        context.cluster = cluster;
        return cluster;
      }
    },
    clusters: {
      type: new GraphQLList(ClusterType),
      resolve: () => config.get('clusters')
    }
  }
});

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    newMessage: {
      type: MessageType,
      args: {
        topic: { type: new GraphQLNonNull(GraphQLString) },
        cluster: { type: new GraphQLNonNull(GraphQLString) },
      },
      subscribe: withFilter((obj, args, { manager }) => {
        const cluster = manager.connectCluster(args.cluster);
        cluster.addTopic(args.topic);

        return manager.pubsub.asyncIterator('messages');
      }, (payload, variables) => {
        if (!payload) return false;
        return payload.topic === variables.topic;
      }),
      resolve: ({ message }) => message
    }
  }
});

module.exports = new GraphQLSchema({
  query: QueryType,
  subscription: SubscriptionType
});
