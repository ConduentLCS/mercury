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
          br(v-for="n in 10")
</template>

<script>
  import Datacenters from '@/components/DatacenterList';

  export default {
    components: { Datacenters }
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
      padding: 0.4em 1em;
      flex-grow: 2
    }
    .topics {
      padding: 0.4em 1em;
      flex-grow: 1
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
