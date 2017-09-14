<template lang="pug">
  #topic-explorer
    .toolbar
      .details
        | Topic: #[b {{ this.topic }}] -
        | Offset: #[b {{ this.offset }}] -
        | Partition: #[b {{ this.currentPartition }}]
      .options
        .ui.search
        .ui.icon.input
          input(type="text" placeholder="Filter..." v-model="filter")
          i.filter.icon
        .ui.mini.yellow.circular.icon.button(title="Minimize")
          i.minus.icon
        .ui.mini.green.circular.icon.button(title="Maximize")
          i.plus.icon
    .console
      .message(v-for="message in messages")
        | {{ message.data }}
    .viewer
</template>

<script>
  export default {
    data() {
      return {
        filter: '',
        topic: 'User',
        offset: 30,
        partition: null
      };
    },
    computed: {
      messages() {
        return this.$store.state.messages;
      },
      currentPartition() {
        return this.partition || 'ALL';
      }
    }
  };
</script>

<style lang="scss" scoped>
  $explorerHeight: 24em;
  $toolbarHeight: 2.2em;
  $yellowButton: #FCBF40;
  $greenButton: #34C949;
  #topic-explorer {
    position: fixed;
    display: flex;
    flex-direction: column;
    height: $explorerHeight;
    width: 100%;
    bottom: 0;
    margin-left: -1em;
    background: #363636;
    box-shadow:0 2px 4px 0 rgba(34,36,38,.12), 
      0 2px 10px 0 rgba(34,36,38,.15);
    .toolbar {
      background: #D5D5D5;
      border: 1px solid #808080;
      height: $toolbarHeight;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.5em;
      .icon.input input {
        padding: 0.3em 1em;
      }
      .icon.button {
        padding: 0.28em;
        margin-left: 0.3em;
        color: #656565;
        &.yellow {
         background-color: $yellowButton;
         margin-left: 1em;
         &:hover {background-color: darken($yellowButton, 10%)}
        }
        &.green { 
          background-color: $greenButton;
          &:hover {background-color: darken($greenButton, 10%)}
        }
      }
    }
    .console {
      overflow: auto;
      padding: 1em;
      flex: 1;
      .message {
        color: #FFF;
      }
    }
  }
</style>
