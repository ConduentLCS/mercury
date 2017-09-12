<template lang="pug">
  .ui.basic.segment
    .widgets.ui.grid
      .sixteen.wide.mobile.eight.wide.tablet.four.wide.computer.column(v-for="widget in widgets")
        widget(:icon="widget.icon" :color="widget.color" :title="widget.title" :count="widget.count")
</template>

<script>
  import Widget from '@/components/Widget';

  export default {
    data() {
      return {
        widgets: [
          { icon: 'fa fa-eye', color: 'red', title: 'Zookeepers', count: 4 },
          { icon: 'fa fa-handshake-o', color: 'blue', title: 'Brokers', count: 6 },
          { icon: 'fa fa-list', color: 'yellow', title: 'Topics', count: 54 },
          { icon: 'fa fa-users', color: 'green', title: 'Consumers', count: 182 }
        ]
      };
    },
    computed: {
      datacenter() {
        return this.$store.state.datacenter;
      }
    },
    components: { Widget }
  };
</script>

<style lang="scss">
</style>
