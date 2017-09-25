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
        #explorer.hint(v-if="!topic")
          i.fa.fa-terminal
          | Select a Topic to Open Explorer
</template>

<script>
  import Widget from '@/components/Widget';
  import Zookeepers from '@/components/ZookeeperList';
  import Brokers from '@/components/BrokerList';
  import Consumers from '@/components/ConsumerList';

  export default {
    computed: {
      cluster() {
        return this.$store.state.cluster;
      },
      topic() {
        return this.$store.state.topic;
      },
      widgets() {
        const topicCount = this.$store.state.topicCount;
        return [
          { icon: 'fa fa-eye', color: 'red', title: 'Zookeepers', count: 9 },
          { icon: 'fa fa-handshake-o', color: 'blue', title: 'Brokers', count: 6 },
          { icon: 'fa fa-list', color: 'yellow', title: 'Topics', count: topicCount },
          { icon: 'fa fa-users', color: 'green', title: 'Consumers', count: 182 }
        ];
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
    #explorer.hint {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 2.2em 0;
      height: 8em;
      color: #767676;
      font-size: 2em;
      i { margin-right: 0.5em }
      @media(max-width: 425px) {
        text-align: center;
        line-height: 2em;
      }
    }
  }
</style>
