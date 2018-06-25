<template lang="pug">
  #app.pushable
    sidebar
    .pusher
      dashboard(v-if="cluster")
      .no.cluster(v-else)
        i.large.sitemap.icon
        |  Select a Cluster
</template>

<script>
  import Sidebar from '@/components/Sidebar';
  import Dashboard from '@/components/Dashboard';

  export default {
    computed: {
      cluster() {
        return this.$store.state.cluster;
      }
    },
    components: { Sidebar, Dashboard }
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
  .pusher > .no.cluster {
    display: flex;
    flex: 1 0;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2.5em;
    i { 
      margin-right: 0.5em;
      font-size: 1em;
    }
  }
  .centered-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .ui.visible.sidebar ~ .pusher {
    width: calc(100% - 260px);
    overflow-y: auto;
    height: 100vh;
  }
</style>
