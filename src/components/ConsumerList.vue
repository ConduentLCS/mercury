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
          .description Topics: #[b {{ consumer.topics }}]
</template>

<script>
  import search from 'fuzzysearch';

  export default {
    data() {
      return {
        query: '',
        consumers: [
          { group: 'email.service', topics: 1 },
          { group: 'async.service', topics: 10 },
          { group: 'portal.app', topics: 3 },
          { group: 'compliance.app', topics: 4 },
          { group: 'search.service', topics: 6 },
          { group: 'highlight.service', topics: 1 },
          { group: 'review.app', topics: 5 },
          { group: 'redaction.service', topics: 2 },
          { group: 'analytics.app', topics: 8 },
          { group: 'review.app', topics: 5 },
          { group: 'review.app', topics: 5 }
        ]
      };
    },
    computed: {
      filteredConsumers() {
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
