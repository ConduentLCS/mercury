<template lang="pug">
  #app
    sidebar
    router-view
</template>

<script>
export default {
  name: 'app'
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
