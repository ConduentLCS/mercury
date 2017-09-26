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
  import gql from 'graphql-tag';

  export default {
    apollo: {
      zookeepers: {
        query: gql` query Zookeepers($address: String!) {
          cluster(address: $address) {
            zookeepers {
              hostname
              latency
              isLeader
            }
          }
        }`,
        variables() {
          return {
            address: this.$store.state.cluster
          };
        },
        update(data) {
          return data.cluster.zookeepers;
        },
        result(res) {
          if (!res.loading) {
            const zookeepers = res.data.cluster.zookeepers;
            this.$store.commit('updateZookeepers', zookeepers);
          }
        }
      }
    },
    mounted() {
      $('.fa-stack').popup({ inline: false });
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
