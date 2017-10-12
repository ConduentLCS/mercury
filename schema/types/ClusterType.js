const { Socket } = require('net');

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
      resolve: () => (
        addLatency(db.topics.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }), 1500)
      )
    },
    zookeepers: {
      type: new GraphQLList(ZookeeperType),
      description: 'Zookeeper nodes from a cluster',
      resolve: cluster => Promise.all(
        cluster.zk.client.connectionManager.servers.map(zk => (
          new Promise((res) => {
            const socket = new Socket();
            socket.connect(zk.port, zk.host, () => socket.write('mntr'));

            socket.on('data', (data) => {
              let metrics = data.toString();
              metrics = metrics.split('\n').reduce((formatted, line) => {
                if (line === '') return formatted;
                const [key, val] = line.split('\t');
                formatted[key] = val;
                return formatted;
              }, {});
              socket.destroy();
              res({ hostname: zk.host, metrics });
            });
          })
        ))
      )
    },
    zookeeper: {
      type: ZookeeperType,
      args: {
        hostname: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (cluster, args) => {
        const zk = cluster.zk.client.connectionManager.servers.find(node => (
          node.host === args.hostname
        ));

        if (zk) {
          return new Promise((res) => {
            const socket = new Socket();
            socket.connect(zk.port, zk.host, () => socket.write('mntr'));

            socket.on('data', (data) => {
              let metrics = data.toString();
              metrics = metrics.split('\n').reduce((formatted, line) => {
                if (line === '') return formatted;
                const [key, val] = line.split('\t');
                formatted[key] = val;
                return formatted;
              }, {});
              socket.destroy();
              res({ hostname: zk.host, metrics });
            });
          });
        }

        return null;
      }
    },
    kafkaBrokers: {
      type: new GraphQLList(KafkaBrokerType),
      description: 'Kafka Brokers that are active in a given cluster',
      resolve: () => db.brokers
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
      resolve: () => db.consumers
    },
    consumer: {
      type: ConsumerType,
      args: {
        group: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (context, args) => (
        addLatency(db.consumers.find(consumer => consumer.group === args.group), 1500)
      )
    }
  }
});

module.exports = ClusterType;
