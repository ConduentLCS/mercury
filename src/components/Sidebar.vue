<template lang="pug">
  .ui.sidebar.visible.inverted.vertical.left
    .brand
      | Mercury
      img.logo(:src="logo")
    .ui.inverted.accordion
      .active.title(@click="setIndex(0)")
        i.fa.fa-sitemap.symbol
        | Clusters
        i.fa.fa-minus-circle.indicator(v-if="!index")
        i.fa.fa-plus-circle.indicator(v-else)
      clusters.active.content
      .title(@click="setIndex(1)")
        i.fa.fa-send.symbol
        | Topics
        i.fa.fa-minus-circle.indicator(v-if="index")
        i.fa.fa-plus-circle.indicator(v-else)
      topics.content(v-if="cluster")
      .no.cluster.content(@click="setIndex(0)" v-else)
        .hint
          | Select a Cluster
          i.fa.fa-arrow-up
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
    mounted() {
      $('.ui.accordion').accordion({
        collapsible: false,
        on: null
      });
      this.$store.watch(state => state.cluster, () => {
        this.setIndex(1);
      });
    },
    methods: {
      setIndex(i) {
        if ($('.accordion .vue-simple-spinner').length) return;
        this.index = i;
        $('.ui.accordion').accordion('open', i);
      }
    },
    computed: {
      cluster() {
        return this.$store.state.cluster;
      }
    },
    components: { Clusters, Topics }
  };
</script>

<style lang="scss" scoped>
  $brandHeight: 4.3rem;
  $titleHeight: 3.5rem;
  @function calcContent() {
    @return ($titleHeight * 2) + $brandHeight;
  }
  .ui.sidebar {
    color: #FFF;
    background-color: #262B33;
    display: flex;
    flex-direction: column;
    overflow-y: hidden !important;
    height: 100vh !important;
    position: fixed;
    .divider {
      margin-top: 0;
      border-bottom-color: #FFF;
    }
  }
  .brand {
    display: inherit;
    justify-content: center;
    border-bottom: 1px solid #FFF;
    line-height: 1.28571429em;
    padding: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
    font-size: 2em;
    height: $brandHeight;
    .logo {
      height: 1.5em;
      margin-left: 0.2em;
    }
  }
  .accordion {
    height: calc(100vh - #{$brandHeight});
    .content { 
      overflow: auto;
      max-height: calc(100vh - #{calcContent()});
    }
    .title {
      font-size: 1.6em !important;
      padding: 0.5em !important;
      height: $titleHeight;
      border-top: 1px solid #FFF;
      &:first-child { border: 0 }
      .symbol { margin-right: 0.5em }
      .indicator { 
        float: right;
        font-size: 1em;
      }
    }
  }
  .no.cluster {
    margin: 0.5em auto 0;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: #DADADA;
    }
    i { margin-left: 0.5em }
  }
</style>
