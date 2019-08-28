const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const TopicType = require('./TopicType');
const ZookeeperType = require('./ZookeeperType');
const KafkaBrokerType = require('./KafkaBrokerType');
const ConsumerType = require('./ConsumerType');

const {
  addLatency,
  db
} = require('../utils');

const ClusterType = new GraphQLObjectType({
  name: 'Cluster',
  fields: {
    datacenter: { type: GraphQLString, description: 'Datacenter identifier' },
    zookeeperString: { type: GraphQLString, description: 'Zookeeper connection string for a cluster' },
    alias: { type: GraphQLString, description: 'Alias or helping text for cluster identification' },
    topics: {
      type: new GraphQLList(TopicType),
      description: 'Collection of topics from the cluster',
      resolve: cluster => cluster.getTopics()
    },
    zookeepers: {
      type: new GraphQLList(ZookeeperType),
      description: 'Zookeeper nodes from a cluster',
      resolve: cluster => cluster.getZookeepers()
    },
    zookeeper: {
      type: ZookeeperType,
      args: {
        hostname: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (cluster, args) => cluster.getZookeeper(args.hostname)
    },
    kafkaBrokers: {
      type: new GraphQLList(KafkaBrokerType),
      description: 'Kafka Brokers that are active in a given cluster',
      resolve: cluster => cluster.getBrokers()
    },
    kafkaBroker: {
      type: KafkaBrokerType,
      args: {
        hostname: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (context, args) => (
        addLatency(db.brokers.find(kf => kf.hostname === args.hostname), 1500)
      )
    },
    consumers: {
      type: new GraphQLList(ConsumerType),
      description: 'Consumer groups registed in a given cluster',
      resolve: cluster => cluster.getConsumers()
    },
    consumer: {
      type: ConsumerType,
      args: {
        group: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (cluster, { group }, context) => {
        context.group = group;
        return { group };
      }
    }
  }
});

module.exports = ClusterType;
