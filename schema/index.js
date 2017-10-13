const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const { PubSub, withFilter } = require('graphql-subscriptions');
const Kafka = require('kafka-node');
const config = require('config');

const ClusterType = require('./types/ClusterType');
const MessageType = require('./types/MessageType');

const pubsub = new PubSub();

// Open Cluster Sockets
const clusterSockets = {};

// BEGIN MOCK MESSAGES ( TODO Remove )
let counter = 0;
const faker = require('faker');

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

// END MOCK MESSAGES

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    cluster: {
      type: ClusterType,
      args: {
        address: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (context, args) => new Promise((resolve) => {
        let cluster = clusterSockets[args.address];

        if (!cluster) {
          cluster = new Kafka.Client(args.address);
          cluster.on('connect', () => resolve(cluster));
        } else {
          resolve(cluster);
        }
      })
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
