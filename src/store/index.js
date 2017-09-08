import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    datacenter: null
  },
  mutations: {
    changeDatacenter(state, datacenter) {
      state.datacenter = datacenter;
    }
  }
});
