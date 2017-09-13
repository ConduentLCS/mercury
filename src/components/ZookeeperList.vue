<template lang="pug">
  #zookeepers
    .ui.middle.aligned.selection.list
      .item(
          v-for="zk in zookeepers"
          :key="zk.hostname"
      )
        .content
          .header
            | {{ zk.hostname }}
            template(v-if="zk.isLeader")
              span.fa-stack(data-content="This node is currently the leader" data-position="top center")
                i.fa.fa-square-o.fa-stack-2x
                i.fa.fa-star.fa-stack-1x
          .description Average Latency: #[b {{ zk.latency }}]
</template>

<script>
  export default {
    mounted() {
      $('.fa-stack').popup({ inline: false });
    },
    data() {
      return {
        zookeepers: [
          { hostname: 'zk-host01.amicillc.com', latency: 4, isLeader: true },
          { hostname: 'zk-host02.amicillc.com', latency: 0, isLeader: false },
          { hostname: 'zk-host03.amicillc.com', latency: 1, isLeader: false },
          { hostname: 'zk-host04.amicillc.com', latency: 4, isLeader: false },
          { hostname: 'zk-host05.amicillc.com', latency: 0, isLeader: false },
          { hostname: 'zk-host06.amicillc.com', latency: 1, isLeader: false },
          { hostname: 'zk-host07.amicillc.com', latency: 4, isLeader: false },
          { hostname: 'zk-host08.amicillc.com', latency: 0, isLeader: false },
          { hostname: 'zk-host09.amicillc.com', latency: 1, isLeader: false },
        ]
      };
    }
  };
</script>

<style lang="scss">
  #zookeepers {
    .fa-stack {
      float: right;
      i { color: #FFC107}
    }
  }
</style>
