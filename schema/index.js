const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const { PubSub, withFilter } = require('graphql-subscriptions');
const faker = require('faker');
const Kafka = require('kafka-node');
const Net = require('net');

const pubsub = new PubSub();

let counter = 0;

setInterval(() => {
  const timestamp = faker.date.past().toISOString();
  pubsub.publish('messages', {
    topic: 'user',
    message: {
      offset: counter,
      partition: faker.random.number({ min: 1, max: 4 }),
      timestamp,
      data: JSON.stringify({
        id: faker.random.uuid(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        age: faker.random.number({ min: 18, max: 35 }),
        position: faker.name.jobArea(),
        phone: faker.phone.phoneNumberFormat(0),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        verified: faker.random.boolean(),
        timestamp,
        truncated: 'search this'
      })
    }
  });
  counter += 1;
}, 5000);

const GraphQLJSON = require('graphql-type-json');

const topics = [
  { name: 'email', offset: 7126, partitions: 3 },
  { name: 'user', offset: 1263, partitions: 2 },
  { name: 'database', offset: 8723, partitions: 4 },
  { name: 'app', offset: 9421, partitions: 2 },
  { name: 'events', offset: 7231, partitions: 3 },
  { name: 'async', offset: 532, partitions: 3 },
  { name: 'log', offset: 72635, partitions: 3 },
  { name: 'highlight', offset: 986, partitions: 3 },
  { name: 'tasks', offset: 283, partitions: 3 },
  { name: 'search', offset: 8623, partitions: 3 },
  { name: 'tags', offset: 6234, partitions: 3 }
];

const getTopics = (start, end) => topics.slice(start, end);

const zkMetrics = [
  { metric: 'Average Latency', value: 5 },
  { metric: 'Outstanding Requests', value: 3 },
  { metric: 'Received', value: 852 },
  { metric: 'Sent', value: 906 },
  { metric: 'File Descriptors', value: 2 },
  { metric: 'Mode', value: 'leader' },
  { metric: 'Pending Syncs', value: 3 },
  { metric: 'Followers', value: 8 },
  { metric: 'Heap Memory', value: '125M' },
  { metric: 'Version', value: '3.4.0' }
];

const kfMetrics = [
  { metric: 'UnderReplicatedPartitions', value: 1 },
  { metric: 'OfflinePartitionsCount', value: 2 },
  { metric: 'ActiveControllerCount', value: 3 },
  { metric: 'MessagesInPerSec', value: 18 },
  { metric: 'BytesInPerSec', value: 448 },
  { metric: 'BytesOutPerSec', value: 234 },
  { metric: 'RequestsPerSec', value: 25 },
  { metric: 'LogFlushRateAndTimeMs', value: 43 },
  { metric: 'LeaderElectionRateAndTimeMs', value: 22 },
  { metric: 'UncleanLeaderElectionsPerSec', value: 32 },
  { metric: 'Partition Count', value: 54 },
  { metric: 'Leader Count', value: 1 }
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const db = {
  clusters: [
    { datacenter: 'ALB', address: 'roc-dvzoo01.amicillc.com:2181,roc-dvzoo02.amicillc.com:2181,roc-dvzoo03.amicillc.com:2181', alias: 'Development' }
  ],
  topics,
  zookeepers: [
    { hostname: 'zk-host01.amicillc.com', latency: 4, isLeader: true, metrics: zkMetrics },
    { hostname: 'zk-host02.amicillc.com', latency: 0, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host03.amicillc.com', latency: 1, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host04.amicillc.com', latency: 4, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host05.amicillc.com', latency: 0, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host06.amicillc.com', latency: 1, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host07.amicillc.com', latency: 4, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host08.amicillc.com', latency: 0, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host09.amicillc.com', latency: 1, isLeader: false, metrics: zkMetrics }
  ],
  brokers: [
    { hostname: 'kf-broker01.amicillc.com', bytesUp: 324, bytesDown: 482, metrics: kfMetrics },
    { hostname: 'kf-broker02.amicillc.com', bytesUp: 723, bytesDown: 623, metrics: kfMetrics },
    { hostname: 'kf-broker03.amicillc.com', bytesUp: 152, bytesDown: 912, metrics: kfMetrics },
    { hostname: 'kf-broker04.amicillc.com', bytesUp: 178, bytesDown: 346, metrics: kfMetrics },
    { hostname: 'kf-broker05.amicillc.com', bytesUp: 462, bytesDown: 622, metrics: kfMetrics },
    { hostname: 'kf-broker06.amicillc.com', bytesUp: 836, bytesDown: 735, metrics: kfMetrics }
  ],
  consumers: [
    { group: 'email.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'async.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'portal.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'compliance.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'search.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'highlight.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'review.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'redaction.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'analytics.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'review.app', topics: getTopics(0, getRandomInt(1, 10)) }
  ]
};

const addLatency = (result, timeout = 0) => (
  new Promise(res => setTimeout(() => res(result), timeout))
);

const KafkaBrokerType = new GraphQLObjectType({
  name: 'KafkaBroker',
  fields: {
    hostname: { type: GraphQLString },
    bytesUp: { type: GraphQLInt },
    bytesDown: { type: GraphQLInt },
    metrics: { type: GraphQLJSON }
  }
});

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

const TopicType = new GraphQLObjectType({
  name: 'Topic',
  fields: {
    name: { type: GraphQLString },
    offset: { type: GraphQLInt },
    partitions: { type: GraphQLInt }
  }
});

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

const ClusterType = new GraphQLObjectType({
  name: 'Cluster',
  fields: {
    datacenter: { type: GraphQLString, description: 'Datacenter identifier' },
    address: { type: GraphQLString, description: 'Connection address for the given cluster' },
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
            const socket = new Net.Socket();
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
            const socket = new Net.Socket();
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

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    offset: { type: GraphQLString },
    partition: { type: GraphQLInt },
    timestamp: { type: GraphQLString },
    data: { type: GraphQLString }
  }
});

const kafkaSockets = {};

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    cluster: {
      type: ClusterType,
      args: {
        address: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (context, args) => {
        if (!kafkaSockets[args.address]) {
          kafkaSockets[args.address] = new Kafka.Client(args.address);
        }

        return kafkaSockets[args.address];
      }
    },
    clusters: {
      type: new GraphQLList(ClusterType),
      resolve: () => addLatency(db.clusters, 1500)
    }
  }
});

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    newMessage: {
      type: MessageType,
      args: {
        topic: { type: new GraphQLNonNull(GraphQLString) }
      },
      subscribe: withFilter(() => pubsub.asyncIterator('messages'), (payload, variables) => (
        payload.topic === variables.topic
      )),
      resolve: ({ message }) => message
    }
  }
});

module.exports = new GraphQLSchema({
  query: QueryType,
  subscription: SubscriptionType
});
