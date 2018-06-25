const Cluster = require('./cluster');

const { PubSub } = require('graphql-subscriptions');

class ClusterManager {
  constructor() {
    this.clusters = {};
    this.pubsub = new PubSub();
  }

  /**
   * Add specified cluster to pool via Zookeeper connection string
   * e.g. us-dev-zoo01.example.com:2181;us-dev-zoo02.example.com:2181;
   * @param {String} address Zookeeper connection string
   * @returns {Cluster}
   */
  connectCluster(address) {
    let cluster = this.getCluster(address);

    if (!cluster) {
      cluster = new Cluster(address, this.pubsub);
      this.clusters[address] = cluster;
    }

    return cluster;
  }

  /**
   * Fetch cluster from connection pool if it exists
   * @param {String} address Zookeeper connection string
   * @returns {(Cluster|null)}
   */
  getCluster(address) {
    if (!this.clusters[address]) {
      return null;
    }

    return this.clusters[address];
  }
}

module.exports = new ClusterManager();
