<template lang="pug">
  #dashboard
    .ui.basic.segment
      #widgets.ui.grid
        .sixteen.wide.mobile.eight.wide.tablet.four.wide.computer.column(v-for="widget in widgets")
          widget(:icon="widget.icon" :color="widget.color" :title="widget.title" :count="widget.count")
      #services.ui.grid
        .column
          .ui.raised.card
            .content.head
              .header Zookeepers
              .meta
                .category Active Nodes
            .content
              .description
                zookeepers
        .column
          .ui.raised.card
            .content.head
              .header Kafka Brokers
              .meta
                .category Active Nodes
            .content
              .description
                brokers
        .column
          .ui.raised.card
            .content.head
              .header Consumers
              .meta
                .category Registered Groups
            .content
              .description
                consumers
</template>

<script>
  import Widget from '@/components/Widget';
  import Zookeepers from '@/components/ZookeeperList';
  import Brokers from '@/components/BrokerList';
  import Consumers from '@/components/ConsumerList';

  export default {
    data() {
      return {
        widgets: [
          { icon: 'fa fa-eye', color: 'red', title: 'Zookeepers', count: 9 },
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
    components: { Widget, Zookeepers, Brokers, Consumers }
  };
</script>

<style lang="scss">
  #dashboard {
    .ui.basic.segment {
      min-height: 100vh;
    }
    #services.grid {
      margin-top: 2.2em;
      &>.column {
        display: flex !important;
        justify-content: center;
        width: 33.33333333%;
        @media (max-width: 991px) {
          width: 100%;
        }
      }
      .card {
        width: 95%;
        height: 30em;
        .ui.list {
          height: 23em;
          overflow: auto;
        }
      }
      .content.head { flex-grow: 0 }
    }
  }
</style>
