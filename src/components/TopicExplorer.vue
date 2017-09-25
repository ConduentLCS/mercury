<template lang="pug">
  transition(name="slide")
    #topic-explorer(:class="{maximized: isMaximized}")
      .toolbar
        .details
          | Topic: #[b {{ this.topic.name | ucfirst }}] -
          | Offset: #[b {{ this.topic.offset.toLocaleString() }}]
        .options
          i.pause.link.tail.icon(
            v-if="isTailing"
            @click="toggleTail"
            title="Pause Feed"
          )
          i.play.link.tail.icon(
            v-else
            @click="toggleTail"
            title="Resume Feed"
          )
          .ui.icon.input
            input(type="text" placeholder="Filter..." v-model="filter")
            i.filter.icon
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
            | {{ message.data | limit }}
            .meta
              .offset
                | Offset: {{ message.offset }} |
                | Partition: {{ message.partition }}
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

  export default {
    data() {
      return {
        filter: '',
        message: null,
        showViewer: false,
        isMaximized: false,
        isTailing: true
      };
    },
    computed: {
      messages() {
        return this.$store.state.messages;
      },
      pretty() {
        if (!this.message) return '';
        try {
          return jsonMarkup(JSON.parse(this.message.data));
        } catch (e) {
          return '<div class="issue">Message cannot be parsed</div>';
        }
      },
      topic() {
        return this.$store.state.topic;
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
      toggleTail() {
        this.isTailing = !this.isTailing;
      }
    },
    filters: {
      limit: (data = '') => {
        if (data.length > 230) {
          return `${data.substring(0, 230)} ...`;
        }

        return data;
      },
      date: (date) => {
        const parsed = moment(date);
        if (parsed.isValid()) {
          return moment(date).format('M/D/YYYY h:mm:ss A');
        }

        return '';
      },
      ucfirst: str => (
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      )
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
