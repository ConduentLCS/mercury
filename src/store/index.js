import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    datacenter: null,
    topic: null
  },
  mutations: {
    changeDatacenter(state, datacenter) {
      state.datacenter = datacenter;
    },
    changeTopic(state, topic) {
      state.topic = topic;
    }
  }
});
