<template lang="pug">
  .ui.sidebar.visible.inverted.vertical.left
    h1.logo Mercury
    .ui.divider
    .container
      .clusters
        .title
          i.fa.fa-sitemap
          | Clusters
        .content
          datacenters
      .ui.divider
      .topics
        .title
          i.fa.fa-send
          | Topics
        .content
          topics
</template>

<script>
  import Datacenters from '@/components/DatacenterList';
  import Topics from '@/components/TopicList';

  export default {
    components: { Datacenters, Topics }
  };
</script>

<style lang="scss" scoped>
  .ui.sidebar {
    color: #FFF;
    background-color: #262B33;
    display: flex;
    flex-direction: column;
    .divider {
      margin-top: 0;
      border-bottom-color: #FFF;
    }
  }
  .logo {
    display: inherit;
    justify-content: center;
    margin: 0.3em 0;
  }
  .container {
    display: inherit;
    flex: 1 0;
    flex-direction: column;
    .clusters {
      padding: 0.4em 1em 1.8em;
      flex: 1 1 60%
    }
    .topics {
      padding: 0.3em 0.6em;
      flex: 1 1 40%;
    }
    .title {
      font-size: 1.6em;
      i { margin-right: 0.5em }
    }
    .content {
      padding-top: 1.5em;
    }
  }
</style>
