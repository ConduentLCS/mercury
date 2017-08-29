<template lang="pug">
  .ui.sidebar.inverted.vertical.menu
    a.item= 1
    a.item= 2
    a.item= 3
</template>

<script>
  $(document).ready(() => $('.ui.sidebar').sidebar('toggle'));
  export default {
    name: 'sidebar',
    data() {
      return {
        msg: 'Hello World'
      };
    },
  };
</script>

<style scoped>

</style>
