<template lang="pug">
  #app.pushable
    sidebar
    .pusher
      router-view(v-if="datacenter")
      .no.datacenter(v-else)
        i.fa.fa-sitemap
        |  Select a Datacenter
      topicExplorer(v-if="topic")
</template>

<script>
  import Sidebar from '@/components/Sidebar';
  import TopicExplorer from '@/components/TopicExplorer';

  export default {
    computed: {
      datacenter() {
        return this.$store.state.datacenter;
      },
      topic() {
        return this.$store.state.topic;
      }
    },
    components: { Sidebar, TopicExplorer }
  };
</script>

<style lang="scss">
  html, body {
    background-color: #EFEFEF;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .pusher > .no.datacenter {
    display: flex;
    flex: 1 0;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2.5em;
    i { margin-right: 0.5em }
  }
  .ui.visible.sidebar ~ .pusher {
    width: calc(100% - 260px);
  }
</style>
