<template lang="pug">
  .ui.grid
    .four.wide.column
      | 1
    .four.wide.column
      | 2
    .four.wide.column
      | 3
    .four.wide.column
      | 4
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
