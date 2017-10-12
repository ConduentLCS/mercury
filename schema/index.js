const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const ClusterType = require('./types/ClusterType');
const MessageType = require('./types/MessageType');

const {
  addLatency,
  db
} = require('./utils');

const { PubSub, withFilter } = require('graphql-subscriptions');
const Kafka = require('kafka-node');

const pubsub = new PubSub();

// BEGIN MOCK MESSAGES
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
