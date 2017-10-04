import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cluster: null,
    topic: null,
    topics: [],
    zookeepers: [],
    brokers: [],
    consumers: []
  },
  mutations: {
    changeCluster(state, cluster) {
      state.cluster = cluster;
    },
    changeTopic(state, topic) {
      state.topic = topic;
    },
    updateTopics(state, topics) {
      state.topics = topics;
    },
    updateZookeepers(state, zks) {
      state.zookeepers = zks;
    },
    updateBrokers(state, brokers) {
      state.brokers = brokers;
    },
    updateConsumers(state, consumers) {
      state.consumers = consumers;
    }
  }
});
