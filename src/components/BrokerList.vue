<template lang="pug">
  #brokers
    .ui.middle.aligned.selection.list
      .item(
          v-for="broker in brokers"
          :key="broker.hostname"
      )
        .content
          .header
            | {{ broker.hostname }}
          .description
            | Bytes: 
            i.fa.fa-arrow-up
            b {{ broker.bytesUp }} 
            i.fa.fa-arrow-down
            b {{ broker.bytesDown }}
</template>

<script>
  import gql from 'graphql-tag';

  export default {
    apollo: {
      brokers: {
        query: gql` query Brokers($address: String!) {
          cluster(address: $address) {
            kafkaBrokers {
              hostname
              bytesUp
              bytesDown
            }
          }
        }`,
        variables() {
          return {
            address: this.$store.state.cluster
          };
        },
        update(data) {
          return data.cluster.kafkaBrokers;
        },
        result(res) {
          if (!res.loading) {
            const brokers = res.data.cluster.kafkaBrokers;
            this.$store.commit('updateBrokers', brokers);
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  #brokers {
    .fa-arrow-up { color: #43A047 }
    .fa-arrow-down { color: #E53935 }
    .fa { margin-right: 2px }
  }
</style>
