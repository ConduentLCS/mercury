<template lang="pug">
  spinner(
    v-if="loading > 0"
    size="medium"
    line-fg-color="#E37D00"
    line-bg-color="#262B33"
  )
  .cluster-list.ui.form(v-else)
    .grouping(v-for="(clusters, datacenter) in grouped")
      | {{ datacenter }}
      .grouped.fields
        .field(v-for="(address, alias) in clusters")
          .ui.radio.checkbox
            input.vue(:id="address" type="radio" name="cluster" :value="address" v-model="cluster")
            label(:for="address") {{ alias }}
</template>

<script>
  import Spinner from 'vue-simple-spinner';
  import gql from 'graphql-tag';

  export default {
    apollo: {
      clusters: gql` query Clusters {
        clusters {
          datacenter
          address
          alias
        }
      }`
    },
    data() {
      return { loading: 0 };
    },
    computed: {
      grouped() {
        if (!this.clusters) return {};
        return this.clusters.reduce((reduced, { datacenter, address, alias }) => {
          if (!datacenter) datacenter = 'Other';
          if (!reduced[datacenter]) reduced[datacenter] = {};
          reduced[datacenter][alias] = address;
          return reduced;
        }, {});
      },
      cluster: {
        get() {
          return this.$store.state.cluster;
        },
        set(cluster) {
          this.$store.commit('changeCluster', cluster);
        }
      }
    },
    components: { Spinner }
  };
</script>

<style lang="scss" scoped>
  .ui.form {
    padding: 0em 1em 1em;
    .grouping {
      font-size: 1.2em;
      font-weight: bold;
    }
    .grouped.fields {
      margin-left: 1em;
    }
    .ui.checkbox {
      input:active, input:focus, input:checked {
        &~label {
          opacity: 1;
          background: #262B33;
          &:before {
            background: #262B33;
            border-color: #FFF;
          }
          &:after {
            background-color: #85CC18;
          }
        }
      }
      label {
        color: #FFF;
        opacity: 0.6;
        cursor: pointer;
        &:before, &:hover, &:active {
          background: #262B33;
          border-color: #FFF;
        }
      }
    }
  }
</style>
