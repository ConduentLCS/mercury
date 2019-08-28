const jmx = require('jmx');

const client = jmx.createClient({
  host: '192.168.42.10',
  port: 9000
});

client.connect();

client.on('error', (err) => {
  console.error(err);
});

client.on('connect', () => {
  client.getAttribute("kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec", "Count", function(data) {
    console.log(`Bytes In: ${data.toString()}`);
  });
  client.getAttribute("kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec", "Count", function(data) {
    console.log(`Bytes Out: ${data.toString()}`);
  });
});
