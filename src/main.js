import Vue from 'vue';
import debounce from 'debounce';
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
    const Sidebar = $('.ui.sidebar');

    Sidebar.sidebar({
      context: '#app',
      transition: 'push',
      closable: false,
      dimPage: false
    });

    $(window).on('resize', debounce(() => {
      const width = $(window).width();
      if (width < 768) {
        if (Sidebar.sidebar('is visible')) {
          Sidebar.sidebar('hide');
        }
      } else if (Sidebar.sidebar('is hidden')) {
        Sidebar.sidebar('show');
      }
    }, 250));
  },
  router,
  store
});
