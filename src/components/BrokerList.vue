<template lang="pug">
  #brokers
    .ui.middle.aligned.selection.list
      .item(
          v-for="broker in brokers"
          :key="broker.hostname"
      )
        .content
          .header
            | {{ broker.hostname }}
          .description
            | Bytes: 
            i.fa.fa-arrow-up
            b {{ broker.up }} 
            i.fa.fa-arrow-down
            b {{ broker.down }}
</template>

<script>
  export default {
    data() {
      return {
        brokers: [
          { hostname: 'kf-broker01.amicillc.com', up: 324, down: 482 },
          { hostname: 'kf-broker02.amicillc.com', up: 723, down: 623 },
          { hostname: 'kf-broker03.amicillc.com', up: 152, down: 912 },
          { hostname: 'kf-broker04.amicillc.com', up: 178, down: 346 },
          { hostname: 'kf-broker05.amicillc.com', up: 462, down: 622 },
          { hostname: 'kf-broker06.amicillc.com', up: 836, down: 735 }
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  #brokers {
    .fa-arrow-up { color: #43A047 }
    .fa-arrow-down { color: #E53935 }
    .fa { margin-right: 2px }
  }
</style>
