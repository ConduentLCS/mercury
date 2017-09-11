<template lang="pug">
  .topiclist
    .ui.fluid.search
      .ui.icon.input
        input(type="text" placeholder="Search Topics..." v-model="query")
        i.search.icon
    transition-group.ui.middle.aligned.inverted.selection.list(name="list" tag="div")
      .item(
          v-for="topic in filteredTopics"
          v-bind:key="topic.name"
          v-on:click="setTopic(topic.name)"
          v-bind:class="{ active: active(topic.name) }"
      )
        .content
          .header
            | {{ topic.name }}
            i.check.icon(v-if="active(topic.name)")
          .description Offset: #[b {{ topic.offset }}] / Partitions: #[b {{ topic.partitions }}]
</template>

<script>
  import search from 'fuzzysearch';

  export default {
    data() {
      return {
        query: '',
        topics: [
          { name: 'email', offset: 7126, partitions: 3 },
          { name: 'user', offset: 1263, partitions: 2 },
          { name: 'database', offset: 8723, partitions: 4 },
          { name: 'app', offset: 9421, partitions: 2 },
          { name: 'events', offset: 7231, partitions: 3 },
          { name: 'async', offset: 532, partitions: 3 },
          { name: 'log', offset: 72635, partitions: 3 },
          { name: 'highlight', offset: 986, partitions: 3 },
          { name: 'tasks', offset: 283, partitions: 3 },
          { name: 'search', offset: 8623, partitions: 3 },
          { name: 'tags', offset: 6234, partitions: 3 }
        ]
      };
    },
    computed: {
      filteredTopics() {
        return this.topics.filter(({ name }) => search(this.query, name));
      },
      topic: {
        get() {
          return this.$store.state.topic;
        },
        set(topic) {
          this.$store.commit('changeTopic', topic);
        }
      }
    },
    methods: {
      setTopic(topic) {
        this.$store.commit('changeTopic', topic);
      },
      active(topic) {
        return this.topic === topic;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .topiclist {
    .ui.input {
      width: 100%;
      font-size: 0.8em;
    }
    .ui.search .prompt {
      border-radius: 0;
    }
    .check.icon {
      float: right;
      color: #85CC18;
    }
    .content .description {
      font-size: 0.9em;
    }
    .list-enter-active, .list-leave-active {
      transition: all 0.5s !important;
    }
    .list-enter, .list-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    .ui.list{ 
      max-height: 18em;
      overflow: auto;
      .item { margin-right: 2px }
    }
  }
</style>
