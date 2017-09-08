<template lang="pug">
  #app.pushable
    sidebar
    .pusher
      router-view
</template>

<script>
  import Sidebar from '@/components/Sidebar';

  export default {
    components: { Sidebar }
  };
</script>

<style lang="scss">
  html, body {
    background-color: #EFEFEF;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
