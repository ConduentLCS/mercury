<template lang="pug">
  transition(name="slide")
    #topic-explorer(:class="{maximized: isMaximized}")
      .toolbar
        .details
          | Topic: #[b {{ this.topic.name }}] -
          | Offset: #[b {{ this.currentOffset }}]
        .options
          i.pause.link.tail.icon(
            v-if="isTailing"
            @click="toggleTailing"
            title="Pause Feed"
          )
          i.play.link.tail.icon(
            v-else
            @click="toggleTailing"
            title="Resume Feed"
          )
          .ui.icon.input
            input(type="text" placeholder="Filter..." @input="applyFilter" v-model.trim="filterInput")
            i.filter.icon(v-if="!filterInput.length")
            i.link.close.icon(v-else @click="clearFilter")
          .ui.mini.yellow.circular.icon.button(
            title="Minimize"
            @click="minimize"
          )
            i.minus.icon
          .ui.mini.green.circular.icon.button(
            title="Maximize"
            @click="maximize"
          )
            i.plus.icon
      .console(:class="{inspect: showViewer}")
        .list
          .message(
            v-for="message in messages"
            @click="inspect(message)"
          ) 
            .text(v-html="highlight(message.value)")
            .meta
              .offset
                | Key: {{ message.key }} | 
                | Partition: {{ message.partition }} |
                | Offset: {{ message.offset }}
              .time
                | {{ message.timestamp | date }}
        pre.viewer
          i.large.window.close.link.icon(
            title="Close Viewer"
            @click="closeViewer"
          )
          .content(v-html="pretty")
          .details(v-if="this.message")
            span.offset
              | Offset: {{ this.message.offset }}
            span.time
              | {{ this.message.timestamp | date }}
</template>

<script>
  import moment from 'moment';
  import jsonMarkup from 'json-markup';
  import gql from 'graphql-tag';

  export default {
    apollo: {
      $subscribe: {
        messages: {
          query: gql` subscription Messages($topic: String!, $cluster: String!) {
            newMessage(topic: $topic, cluster: $cluster) {
              offset
              partition
              highWaterOffset
              key
              value
              timestamp
            }
          }`,
          variables() {
            return {
              topic: this.$store.state.topic.name,
              cluster: this.$store.state.cluster
            };
          },
          skip() {
            return !this.$store.state.topic || !this.isTailing;
          },
          result(data) {
            const message = data.newMessage;
            const { data: contents = '' } = message;
            const filter = new RegExp(this.filter, 'g');

            // Skip adding message to buffer if filter misses
            if (this.hasFilter && contents.search(filter) < 0) {
              return;
            }

            if (this.messages.length >= 30) {
              this.messages.shift();
            }

            this.setOffset(message.offset);
            this.messages.push(message);
          }
        }
      }
    },
    data() {
      return {
        filter: '',
        filterInput: '',
        offset: 0,
        message: null,
        messages: [],
        showViewer: false,
        isTailing: true,
        isMaximized: false
      };
    },
    computed: {
      pretty() {
        if (!this.message) return '';
        try {
          const value = JSON.parse(this.message.value);
          const data = { key: this.message.key, value };
          return jsonMarkup(data);
        } catch (e) {
          return '<div class="issue">Message cannot be parsed</div>';
        }
      },
      topic() {
        return this.$store.state.topic;
      },
      currentOffset() {
        return this.offset ? this.offset.toLocaleString() : 'N/A';
      },
      hasFilter() {
        return this.filter.length > 0;
      }
    },
    methods: {
      maximize() {
        this.isMaximized = true;
      },
      minimize() {
        this.isMaximized = false;
      },
      inspect(m) {
        this.message = m;
        this.showViewer = true;
      },
      closeViewer() {
        this.showViewer = false;
      },
      toggleTailing() {
        this.isTailing = !this.isTailing;
      },
      setOffset(offset) {
        this.offset = isNaN(Number(offset)) ? 0 : Number(offset);
      },
      clearMessages() {
        this.messages = [];
      },
      clearFilter() {
        this.filterInput = '';
        this.filter = '';
      },
      highlight(message = '') {
        const truncate = condition => (condition ? '...' : '');

        if (this.hasFilter) {
          const filter = new RegExp(this.filter, 'g');
          let hitIndex = message.search(filter) - 30;

          if (hitIndex < 0) hitIndex = 0;

          message = message.substring(hitIndex, hitIndex + 230)
            .replace(filter, '<span class="highlight">$&</span>');

          return `${message} ${truncate(hitIndex + 230 < message.length)}`;
        }

        return `${message.substring(0, 230)} ${truncate(message.length > 230)}`;
      },
      applyFilter: _.debounce(function filter() {
        if (!this.filter.includes(this.filterInput)) {
          this.clearMessages();
        }

        this.filter = this.filterInput;
      }, 350)
    },
    filters: {
      date: (date) => {
        const parsed = moment(date);
        if (parsed.isValid()) {
          return moment(date).format('M/D/YYYY h:mm:ss A');
        }

        return '';
      }
    },
    mounted() {
      this.$store.watch(state => state.topic, () => {
        this.clearMessages();
        this.clearFilter();
        this.setOffset(0);
      });
    }
  };
</script>

<style lang="scss">
  $explorerHeight: 24em;
  $toolbarHeight: 2.2em;
  $yellowButton: #FCBF40;
  $greenButton: #34C949;
  $consoleColor: #363636;
  #topic-explorer {
    position: fixed;
    display: flex;
    flex-direction: column;
    height: $explorerHeight;
    width: 100%;
    bottom: 0;
    background: $consoleColor;
    box-shadow:0 2px 4px 0 rgba(34,36,38,.12), 
      0 2px 10px 0 rgba(34,36,38,.15);
    transition: all 0.5s ease;
    &.maximized { height: 100% }
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
      .tail.icon {
        margin: 0 0.5em;
        font-size: 1.2em;
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
      display: flex;
      flex: 1;
      overflow-x: hidden;
      &.inspect {
        .viewer>.window.close { display: block }
        &>.viewer { flex-basis: 25% }
        &>.list { flex-basis: 75% }
      }
      .list {
        overflow-y: auto;
        overflow-x: hidden;
        flex-shrink: 0;
        flex-basis: 100%;
        transition: flex-basis 0.3s ease;
      }
      .viewer {
        flex-basis: 0%;
        font-family: inherit;
        white-space: pre-wrap;
        word-break: break-all;
        margin: 0;
        color: #FFF;
        display: flex;
        flex-direction: column;
        background: #2B2B2B;
        transition: flex-basis 0.3s ease;
        .content { 
          flex: 1 0;
          padding: 1.2em 1em 0;
          display: inherit;
          overflow-y: auto;  
          >.issue {
            font-size: 1.5em;
            align-self: center;
            margin: auto;
          }
        }
        .details {
          display: flex;
          justify-content: space-between;
          font-size: 0.9em;
          color: #FFF;
          background: #444;
          padding: 0.1em 0.5em;
        }
        .window.close {
          display: none;
          position: absolute;
          right: 0.4em;
          top: 2em;
        }
        .json-markup {
          line-height: 1.25em;
          font-size: 1em;
        }
        .json-markup-key {
          font-weight: bold;
          color: #9CCC65;
        }
        .json-markup-bool { color: #EF5350 }
        .json-markup-string { color: #FFD54F }
        .json-markup-null { color: #C7C7C7 }
        .json-markup-number { color: #42A5F5 }
      }
      .message {
        color: #FFF;
        padding: 0.7em 1em;
        border-bottom: 1px solid #CDCDCD;
        word-break: break-all;
        &:hover { 
          cursor: pointer;
          background-color: lighten($consoleColor, 10%);
        }
        .meta {
          display: flex;
          color: #BABABC;
          justify-content: space-between;
        }
        &:last-child { 
          border: none;
        }
        .highlight {
          background: #9CCC65;
          color: #000;
        }
      }
    }
  }
  .slide-leave-active,
  .slide-enter-active {
    transition: 0.3s;
  }
  .slide-enter {
    transform: translateY(100%);
  }
  .slide-leave-to {
    transform: translateY(100%);
  }
</style>
