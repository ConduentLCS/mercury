<template lang="pug">
  transition(name="fade" mode="out-in" enter-active-class="animated fadeIn" @after-enter="bootstrap" appear)
    .list(key="list" v-if="!this.inspecting")
      .ui.fluid.search
        .ui.icon.input
          input(type="text" placeholder="Search Consumers..." v-model="query")
          i.search.icon
      .ui.middle.aligned.selection.list
        .item(
            v-for="consumer in filteredConsumers"
            :key="consumer.group"
            @click="inspect(consumer.group)"
        )
          .content
            .header
              | {{ consumer.group }}
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
        h3.no-metrics(v-if="!consumer.topics.length")
          | No Topics
        .consumer-topic(v-for="topic in consumer.topics" v-else)
          p #[b Topic:] {{ topic.name }}
          table.ui.sortable.very.compact.stackable.celled.table
            thead
              tr
                th Partition
                th Offset
                th Watermark
                th Lag
            tbody
              tr(v-for="offset in topic.offsets")
                td {{ offset.partition }}
                td {{ offset.current || 'N/A' }}
                td {{ offset.offset }}
                td(:class="getLagClass(offset.lag)") {{ offset.lag }}
</template>

<script>
  import Spinner from 'vue-simple-spinner';
  import search from 'fuzzysearch';
  import gql from 'graphql-tag';

  export default {
    apollo: {
      consumers: {
        query: gql` query Consumers($address: String!) {
          cluster(address: $address) {
            consumers {
              group
            }
          }
        }`,
        variables() {
          return {
            address: this.$store.state.cluster
          };
        },
        update(data) {
          return data.cluster.consumers;
        },
        result(res) {
          if (!res.loading) {
            const consumers = res.data.cluster.consumers;
            this.$store.commit('updateConsumers', consumers);
          }
        }
      },
      consumer: {
        query: gql` query Consumer($address: String!, $group: String!) {
          cluster(address: $address) {
            consumer(group: $group) {
              topics {
                name
                offsets
              }
            }
          }
        }`,
        variables() {
          return {
            address: this.$store.state.cluster,
            group: this.inspecting
          };
        },
        update(data) {
          return data.cluster.consumer;
        },
        skip() {
          return !this.inspecting;
        }
      }
    },
    data() {
      return {
        query: '',
        inspecting: null,
        loading: 0
      };
    },
    computed: {
      filteredConsumers() {
        if (!this.consumers) return [];
        return this.consumers.filter(({ group }) => search(this.query, group));
      }
    },
    methods: {
      inspect(zookeeper) {
        this.inspecting = zookeeper;
      },
      bootstrap() {
        $('#consumers .ui.table').tablesort();
      },
      getLagClass(offset) {
        return {
          positive: offset === 0,
          negative: offset !== 0
        };
      }
    },
    updated() {
      this.bootstrap();
    },
    components: { Spinner }
  };
</script>

<style lang="scss" scoped>
  .consumer-topic { margin-bottom: 1em }
</style>

