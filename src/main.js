import Vue from 'vue';
import debounce from 'debounce';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
import 'jquery-tablesort';
import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.min.css';
import '../semantic/dist/semantic.min.css';
import '../semantic/dist/semantic.min';

import App from './App';
import store from './store';

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/graphql'
  })
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
});

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
  store,
  apolloProvider
});
