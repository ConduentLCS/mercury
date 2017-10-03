<template lang="pug">
  #brokers
    transition(name="fade" mode="out-in" enter-active-class="animated fadeIn" @after-enter="bootstrap" appear)
      .list(key="list" v-if="!this.inspecting")
        .ui.middle.aligned.selection.list
          .item(
              v-for="broker in brokers"
              :key="broker.hostname"
              @click="inspect(broker.hostname)"
          )
            .content
              .header
                | {{ broker.hostname }}
              .description
                | Bytes: 
                i.fa.fa-arrow-up
                b {{ broker.bytesUp }} 
                i.fa.fa-arrow-down
                b {{ broker.bytesDown }}
      .metrics(v-else key="individual")
        .centered-container(v-if="loading > 0")
          spinner.spinner(
            size="medium"
            line-fg-color="#E37D00"
            line-bg-color="#FFF"
          )
        template(v-else)
          h4.breadcrumb
            i.link.arrow.left.icon(@click="inspect(null)" title="Back to list")
            | {{ this.inspecting }}
          h3.no-metrics(v-if="!broker.metrics")
            | No Metrics
          table.ui.very.basic.sortable.compact.stackable.celled.table(v-else)
            thead
              tr
                th Metric
                th Value
            tbody
              tr(v-for="metric in broker.metrics")
                td {{ metric.metric }}
                td {{ metric.value }}
</template>

<script>
  import Spinner from 'vue-simple-spinner';
  import gql from 'graphql-tag';

  export default {
    apollo: {
      brokers: {
        query: gql` query Brokers($address: String!) {
          cluster(address: $address) {
            kafkaBrokers {
              hostname
              bytesUp
              bytesDown
            }
          }
        }`,
        variables() {
          return {
            address: this.$store.state.cluster
          };
        },
        update(data) {
          return data.cluster.kafkaBrokers;
        },
        result(res) {
          if (!res.loading) {
            const brokers = res.data.cluster.kafkaBrokers;
            this.$store.commit('updateBrokers', brokers);
          }
        }
      },
      broker: {
        query: gql` query Broker($address: String!, $broker: String!) {
          cluster(address: $address) {
            kafkaBroker(hostname: $broker) {
              metrics
            }
          }
        }`,
        variables() {
          return {
            address: this.$store.state.cluster,
            broker: this.inspecting
          };
        },
        update(data) {
          return data.cluster.kafkaBroker;
        },
        skip() {
          return !this.inspecting;
        }
      }
    },
    data() {
      return {
        inspecting: null,
        loading: 0
      };
    },
    methods: {
      inspect(broker) {
        this.inspecting = broker;
      },
      bootstrap() {
        $('#brokers .ui.table').tablesort();
      }
    },
    updated() {
      this.bootstrap();
    },
    components: { Spinner }
  };
</script>

<style lang="scss" scoped>
  #brokers {
    .fa-arrow-up { color: #43A047 }
    .fa-arrow-down { color: #E53935 }
    .fa { margin-right: 2px }
  }
</style>
