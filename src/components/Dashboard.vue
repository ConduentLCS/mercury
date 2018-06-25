<template lang="pug">
  #dashboard
    .ui.basic.segment
      #widgets.ui.grid
        .sixteen.wide.mobile.eight.wide.tablet.four.wide.computer.column(v-for="widget in widgets")
          widget(:icon="widget.icon" :color="widget.color" :title="widget.title" :count="widget.count")
      #services.ui.grid
        .column
          #zookeepers.ui.raised.card
            .content.head
              i.right.floated.large.eye.icon
              .header Zookeepers
              .meta
                .category Active Nodes
            .content
              .description
                zookeepers
        .column
          #brokers.ui.raised.card
            .content.head
              i.right.floated.large.handshake.icon
              .header Kafka Brokers
              .meta
                .category Active Nodes
            .content
              .description
                brokers
        .column
          #consumers.ui.raised.card
            .content.head
              i.right.floated.large.users.icon
              .header Consumers
              .meta
                .category Registered Groups
            .content
              .description
                consumers
      topicExplorer
</template>

<script>
  import Widget from '@/components/Widget';
  import Zookeepers from '@/components/ZookeeperList';
  import Brokers from '@/components/BrokerList';
  import Consumers from '@/components/ConsumerList';
  import TopicExplorer from '@/components/TopicExplorer';

  export default {
    computed: {
      cluster() {
        return this.$store.state.cluster;
      },
      widgets() {
        const topicCount = this.$store.state.topics.length;
        const zookeeperCount = this.$store.state.zookeepers.length;
        const brokerCount = this.$store.state.brokers.length;
        const consumerCount = this.$store.state.consumers.length;

        return [
          { icon: 'huge eye icon', color: 'red', title: 'Zookeepers', count: zookeeperCount },
          { icon: 'huge handshake icon', color: 'blue', title: 'Brokers', count: brokerCount },
          { icon: 'huge list icon', color: 'yellow', title: 'Topics', count: topicCount },
          { icon: 'huge users icon', color: 'green', title: 'Consumers', count: consumerCount }
        ];
      }
    },
    components: { Widget, Zookeepers, Brokers, Consumers, TopicExplorer }
  };
</script>

<style lang="scss">
  #dashboard {
    .ui.basic.segment {
      min-height: 100vh;
    }
    .large.icon { color: #5F5F5F }
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
        .breadcrumb {
          text-overflow: ellipsis;
          word-break: break-all;
          overflow: hidden;
          white-space: nowrap;
        }
        .ui.list, .metrics {
          height: 23em;
          overflow: auto;
        }
        .no-metrics {
          text-align: center;
          margin-top: 2em;
        }
      }
      .content.head { flex-grow: 0 }
    }
    #zookeepers {
      border-top: 2px solid #EF5350;
      .fa-stack {
        float: right;
        i { color: #FFC107 }
      }
    }
    #brokers {
      border-top: 2px solid #42A5F5;
      .fa-arrow-up { color: #43A047 }
      .fa-arrow-down { color: #E53935 }
      .fa { margin-right: 2px }
    }
    #consumers {
      border-top: 2px solid #9CCC65;
      .ui.input {
        width: 100%;
        font-size: 0.8em;
      }
      .ui.list {
        margin: 0.5em 0 0;
        height: 20.5em !important;
      }
    }
  }
</style>
