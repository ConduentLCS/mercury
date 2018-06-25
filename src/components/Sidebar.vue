<template lang="pug">
  .ui.sidebar.visible.inverted.vertical.left
    #brand
      | Mercury
      img.logo(:src="logo")
    clusters#clusters
    topics#topics
</template>

<script>
  import Clusters from '@/components/ClusterList';
  import Topics from '@/components/TopicList';
  import Logo from '../../static/logo.svg';

  export default {
    data() {
      return {
        logo: Logo,
        index: 0
      };
    },
    components: { Clusters, Topics }
  };
</script>

<style lang="scss">
  $brandHeight: 4.3rem;
  $titleHeight: 3.5rem;
  .ui.sidebar {
    color: #FFF;
    background-color: #262B33;
    display: flex;
    flex-direction: column;
    overflow-y: hidden !important;
    height: 100vh !important;
    position: fixed;
    .title {
      font-size: 1.6em !important;
      padding: 0.5em !important;
      height: $titleHeight;
      border-top: 1px solid #FFF;
      .symbol { margin-right: 0.5em }
      .indicator { 
        float: right;
        font-size: 1em;
      }
    }
  }
  #brand {
    display: flex;
    justify-content: center;
    line-height: 1.28571429em;
    padding: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
    font-size: 2em;
    min-height: $brandHeight;
    .logo {
      height: 1.5em;
      margin-left: 0.2em;
    }
  }
  #clusters {
    display: flex;
    flex-direction: column;
    flex: 1 1 36%;
  }
  #topics {
    display: flex;
    flex-direction: column;
    flex: 1 1 65%;
  }
  .no.cluster {
    margin: 0.5em auto 0;
    text-align: center;
    i { margin-left: 0.5em }
  }
</style>
