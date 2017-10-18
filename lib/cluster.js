const {
  Client,
  Consumer,
  Offset
} = require('kafka-node');

const _ = require('lodash');

class Cluster {
  constructor(zkString, pubsub) {
    this.client = null;
    this.consumer = null;
    this.address = zkString;
    this.pubsub = pubsub;
    this.topics = new Map([]);
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
  }

  /**
   * Initialize the Kafka Offset API
   */
  initOffset() {
    this.offset = new Offset(this.client);
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

      this.pubsub.publish('messages', {
        topic: message.topic,
        message: {
          offset: message.offset,
          partition: message.partition,
          timestamp,
          data: message.value
        }
      });
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
      if (this.topics.has(topic)) {
        resolve(true);
      } else {
        this.offset.fetchLatestOffsets([topic], (e, offsets) => {
          if (e) return reject(e);
          const latest = { topic, offset: offsets[topic][0] };
          return this.consumer.addTopics([latest], (err) => {
            if (err) return reject(err);
            this.topics.set(topic, true);
            return resolve(true);
          }, true);
        });
      }
    });
  }

  /**
   * Retrieve a list of all topics that are assocaited with
   * the cluster
   * @returns {Promise} Represents an array of topics found
   */
  getTopics() {
    return new Promise((resolve, reject) => {
      this.areBrokersReady().then(() => {
        this.client.loadMetadataForTopics([], (err, results) => {
          if (err) return reject(err);
          const raw = _.get(results, '1.metadata');
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
}

module.exports = Cluster;
