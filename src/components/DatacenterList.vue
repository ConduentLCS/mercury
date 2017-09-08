<template lang="pug">
  .ui.form
    .grouping(v-for="(envs, group) in clusters")
      | {{ group }}
      .grouped.fields
        .field(v-for="(val, env) in envs")
          .ui.radio.checkbox
            input.vue(:id="val" type="radio" name="cluster" :value="val" v-model="datacenter")
            label(:for="val") {{ env }}
</template>

<script>
  export default {
    data() {
      return {
        clusters: {
          'United States': {
            Development: 'kf-dev-us',
            QA: 'kf-qa-us',
            Production: 'kf-prod-us'
          },
          'United Kingdom': {
            Development: 'kf-dev-uk',
            QA: 'kf-qa-uk',
            Production: 'kf-prod-uk'
          },
          'Hong Kong': {
            Development: 'kf-dev-hk',
            QA: 'kf-qa-hk',
            Production: 'kf-prod-hk'
          }
        }
      };
    },
    computed: {
      datacenter: {
        get() {
          return this.$store.state.datacenter;
        },
        set(datacenter) {
          this.$store.commit('changeDatacenter', datacenter);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ui.form {
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
