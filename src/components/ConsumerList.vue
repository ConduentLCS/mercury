<template lang="pug">
  #consumers
    .ui.fluid.search
      .ui.icon.input
        input(type="text" placeholder="Search Consumers..." v-model="query")
        i.search.icon
    .ui.middle.aligned.selection.list
      .item(
          v-for="consumer in filteredConsumers"
          :key="consumer.group"
      )
        .content
          .header
            | {{ consumer.group }}
          .description Topics: #[b {{ consumer.topicCount }}]
</template>

<script>
  import search from 'fuzzysearch';
  import gql from 'graphql-tag';

  export default {
    apollo: {
      consumers: {
        query: gql` query Consumers($address: String!) {
          cluster(address: $address) {
            consumers {
              group
              topicCount
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
      }
    },
    data() {
      return { query: '' };
    },
    computed: {
      filteredConsumers() {
        if (!this.consumers) return [];
        return this.consumers.filter(({ group }) => search(this.query, group));
      }
    }
  };
</script>

<style lang="scss" scoped>
  #consumers {
    .ui.input {
      width: 100%;
      font-size: 0.8em;
    }
    .ui.list {
      margin: 0.5em 0 0;
      height: 20.5em !important;
    }
  }
</style>
