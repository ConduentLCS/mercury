var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;

var KafkaClient = kafka.kafkaClient;
var Client = kafka.Client;
var argv = require('optimist').argv;
var topic = argv.topic || 'topic1';
const  _ = require('lodash');

const { promisifyAll } = require('bluebird');



var client = new Client('roc-dvzoo01.amicillc.com:2181,roc-dvzoo02.amicillc.com:2181,roc-dvzoo03.amicillc.com:2181');
var offset = new Offset(client);

client.once('ready', () => {
  // offset.fetchCommits('jvalentini', [
  //   { topic: 'email', partition: 0 }
  // ], (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  // });
  // offset.getLatestOffsets(topics, (err, offsets) => {
  //   console.log(offsets)
  // })
//   promisifyAll(client.zk.client);

//   Promise.all([
//     client.zk.client.getChildrenAsync('/consumers/email-service/offsets'),
//     client.zk.client.getChildrenAsync('/consumers/email-service/owners')
//   ]).then(([offsets, owners]) => {
//     const topics = _.union(offsets, owners);
//     console.log(topics);
//   });
// });

client.refreshMetadata(['email', 'afake', 'jack'], (err) => {
  console.log(err);
  console.log(client.topicPartitions);
});

});

// client.once('ready', () => {
//   console.log(client.brokerMetadata);
// });

// console.log(KafkaClient);

// var client2 = KafkaClient({
//   kafkaHost: 'roc-dvkfabroker01.amicillc.com:9092;roc-dvkfabroker02.amicillc.com:9092;roc-dvkfabroker03.amicillc.com:9092'
// });

// const admin = new kafka.Admin(client2);

// const admin = new Admin(client);

// admin.listGroups((err, res) => {
//   console.log(res);
// });
// client.zk.client.getChildren('/consumers/jvalentini/offsets', (err, topics) => {
//   topics.forEach(topic => {
//     client.zk.client.getChildren(`/consumers/jvalentini/offsets/${}`)
//   })
// });
