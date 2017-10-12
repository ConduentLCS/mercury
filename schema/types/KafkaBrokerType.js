const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const GraphQLJSON = require('graphql-type-json');

const KafkaBrokerType = new GraphQLObjectType({
  name: 'KafkaBroker',
  fields: {
    hostname: { type: GraphQLString },
    bytesUp: { type: GraphQLInt },
    bytesDown: { type: GraphQLInt },
    metrics: { type: GraphQLJSON }
  }
});

module.exports = KafkaBrokerType;
