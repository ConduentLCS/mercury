<template lang="pug">
  .ui.container
    h1(v-if="datacenter") {{ datacenter }}
    h1(v-else) SELECT A DATACENTER
</template>

<script>
  export default {
    computed: {
      datacenter() {
        return this.$store.state.datacenter;
      }
    }
  };
</script>

<style lang="scss">
</style>
