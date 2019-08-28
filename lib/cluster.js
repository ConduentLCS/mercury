const {
  Client,
  Consumer,
  Offset
} = require('kafka-node');

const { promisifyAll } = require('bluebird');
const { Socket } = require('net');
const JMX = require('jmx');
const _ = require('lodash');

class Cluster {
  constructor(zkString, pubsub) {
    this.client = null;
    this.consumer = null;
    this.zookeeper = null;
    this.address = zkString;
    this.pubsub = pubsub;
    this.payloads = new Map([]);
    this.connect();
  }

  /**
   * Connect and intialize the cluster
   */
  connect() {
    this.initClient();
    this.initOffset();
    this.initConsumer();
  }

  /**
   * Initialize the Kafka Client
   */
  initClient() {
    this.client = new Client(this.address);
    this.zookeeper = this.client.zk;
    promisifyAll(this.client);
    promisifyAll(this.client.zk.client);
  }

  /**
   * Initialize the Kafka Offset API
   */
  initOffset() {
    this.offset = new Offset(this.client);
    promisifyAll(this.offset);
  }

  /**
   * Initialize a Kafka Consumer for the cluster
   */
  initConsumer() {
    this.consumer = new Consumer(this.client, [], {
      autoCommit: false
    });

    this.consumer.on('message', (message) => {
      let timestamp = null;
      try {
        const parsed = JSON.parse(message.value);
        timestamp = parsed.timestamp ? parsed.timestamp.split(/\s/)[0] : null;
      } catch (e) {
        timestamp = null;
      }
      const updatedMessage = Object.assign({ timestamp }, message);
      this.pubsub.publish('messages', { topic: message.topic,
        message: updatedMessage });
    });
  }

  /**
   * Determine whether or not the socket connection has been
   * established
   * @returns {Promise} Represents a boolean once ready
   */
  areBrokersReady() {
    return new Promise((resolve, reject) => {
      if (this.client.ready) {
        resolve(true);
      } else {
        const timeOut = setTimeout(() => {
          reject(new Error('Connection timed out'));
        }, 5000);
        this.client.once('connect', () => {
          clearTimeout(timeOut);
          resolve(true);
        });
      }
    });
  }

  /**
   * Add a topic to the cluster's consumer payloads
   * @param {String} topic The topic's name identifier
   * @returns {Promise} Represents the completion of adding a topic
   */
  addTopic(topic) {
    return new Promise((resolve, reject) => {
      if (this.payloads.has(topic)) {
        resolve(true);
      } else {
        this.offset.fetchLatestOffsets([topic], (e, offsets) => {
          if (e) return reject(e);
          const latest = { topic, offset: offsets[topic][0] };
          return this.consumer.addTopics([latest], (err) => {
            if (err) return reject(err);
            this.payloads.set(topic, true);
            return resolve(true);
          }, true);
        });
      }
    });
  }

  /**
   * Retrieve a list of all topics that are associated with
   * the cluster
   * @returns {Promise} Represents an array of topics found
   */
  getTopics() {
    return new Promise((resolve, reject) => {
      this.areBrokersReady().then(() => {
        this.client.loadMetadataForTopics([], (err, results) => {
          if (err) return reject(err);
          const raw = _.get(results, '1.metadata', {});

          const topics = Object.keys(raw).map(topic => ({
            name: topic,
            partitions: Object.keys(raw[topic]).length
          }));

          topics.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });

          return resolve(topics);
        });
      });
    });
  }

  getBrokers() {
    return this.areBrokersReady().then(() => {
      const profiles = this.client.brokerProfiles;
      const brokers = Object.keys(profiles).map(name => (
        new Promise((resolve) => {
          const { host, jmx_port: port } = profiles[name];
          let jmx = null;

          if (port > -1) {
            jmx = JMX.createClient({ host, port });
            jmx.connect();
            jmx.on('connect', () => resolve({ hostname: host, jmx }));
          } else {
            resolve({ hostname: host, jmx });
          }
        })
      ));

      return Promise.all(brokers);
    });
  }

  /**
   * Fetch a single zookeeper node from cluster
   * @param {String} hostname Zookeeper hostname
   * @throws Error if node is not found
   * @returns {Promise} Single ZK node
   */
  getZookeeper(hostname) {
    const zk = this.zookeeper.client.connectionManager.servers.find(node => (
      node.host === hostname
    ));

    if (!zk) throw new Error('Zookeeper not found');

    return Cluster.fetchZkMetrics(zk).then(metrics => ({
      hostname,
      metrics
    }));
  }

  /**
   * Fetch all zookeeper nodes associated with the cluster
   * @returns {Promise} All ZK nodes
   */
  getZookeepers() {
    const zks = this.zookeeper.client.connectionManager.servers;

    if (!zks) return [];

    return Promise.all(zks.map(zk => (
      Cluster.fetchZkMetrics(zk).then(metrics => ({
        hostname: zk.host,
        metrics
      }))
    )));
  }

  /**
   * Retrieve all consumer groups that are registered in the cluster
   * @returns {Promise} All consumer groups
   */
  getConsumers() {
    return this.zookeeper.client.getChildrenAsync('/consumers')
      .then(results => results.sort().map(group => ({ group })));
  }

  /**
   * Fetch a list of topics that a given consumer group is currently
   * consuming from
   * @param {String} group Consumer group id
   * @returns {Promise} Array of topics
   */
  fetchConsumerTopics(group) {
    const getOffsets = this.zookeeper.client.getChildrenAsync(`/consumers/${group}/offsets`)
      .catch(() => []);
    const getOwners = this.zookeeper.client.getChildrenAsync(`/consumers/${group}/owners`)
      .catch(() => []);

    return Promise.all([getOffsets, getOwners]).then(([offsets, owners]) => (
      _.union(offsets, owners).map(name => ({ name }))
    ));
  }

  /**
   * For a given consumer group and topic pair, fetch the respective
   * partition offset, topic highwater mark and the lag
   * @param {String} group Consumer group id
   * @param {String} topic Topic name identifier
   */
  getConsumerOffsets(group, topic) {
    return this.client.refreshMetadataAsync([topic]).then(() => {
      const partitions = this.client.topicPartitions[topic];
      const payloads = partitions.map(partition => ({ topic, partition }));

      return Promise.all([
        this.offset.fetchCommitsAsync(group, payloads),
        this.offset.fetchLatestOffsetsAsync([topic])
      ]).then(([{ [topic]: groups }, { [topic]: latest }]) => (
        Object.keys(groups).reduce((offsets, partition) => {
          const current = groups[partition];
          const offset = latest[partition];
          offsets.push({
            partition,
            current,
            offset,
            lag: (current === -1) ? offset : (offset - current)
          });
          return offsets;
        }, [])
      ));
    });
  }

  /**
   * Connect and retrieve metrics for a given Zookeeper node
   * @param {Object} zk  A Zookeeper node
   * @returns {Object} Zookeeper metrics
   */
  static fetchZkMetrics(zk) {
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
        res(metrics);
      });
    });
  }
}

module.exports = Cluster;
