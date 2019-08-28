const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql');

const GraphQLJSON = require('graphql-type-json');

const KafkaBrokerType = new GraphQLObjectType({
  name: 'KafkaBroker',
  fields: {
    hostname: { type: GraphQLString },
    bytesUp: {
      type: GraphQLInt,
      resolve: ({ jmx }) => new Promise((resolve) => {
        if (jmx) {
          return jmx.getAttribute(
            'kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec',
            'Count', (data) => {
              resolve(data.toString());
            }
          );
        }

        return resolve(null);
      })
    },
    bytesDown: {
      type: GraphQLInt,
      resolve: ({ jmx }) => new Promise((resolve) => {
        if (jmx) {
          return jmx.getAttribute(
            'kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec',
            'Count', (data) => {
              resolve(data.toString());
            }
          );
        }

        return resolve(null);
      })
    },
    metrics: { type: GraphQLJSON },
    hasJMX: {
      type: GraphQLBoolean,
      resolve: broker => broker.jmx !== null
    }
  }
});

module.exports = KafkaBrokerType;
