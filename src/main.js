import Vue from 'vue';
import 'font-awesome/css/font-awesome.css';
import '../semantic/dist/semantic.min.css';
import '../semantic/dist/semantic.min';

import App from './App';
import store from './store';
import router from './router';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  mounted: () => {
    $('.ui.sidebar').sidebar({
      context: '#app',
      transition: 'push'
    });
  },
  router,
  store
});
