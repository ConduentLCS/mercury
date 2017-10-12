const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const GraphQLJSON = require('graphql-type-json');

const ZookeeperType = new GraphQLObjectType({
  name: 'Zookeeper',
  fields: {
    hostname: { type: GraphQLString },
    metrics: {
      type: GraphQLJSON,
      resolve: ({ metrics }) => (
        Object.keys(metrics).map(metric => ({ metric, value: metrics[metric] }))
      )
    },
    latency: {
      type: GraphQLInt,
      resolve: ({ metrics }) => metrics.zk_avg_latency
    },
    isLeader: {
      type: GraphQLBoolean,
      resolve: ({ metrics }) => metrics.zk_server_state === 'leader'
    }
  }
});

module.exports = ZookeeperType;
