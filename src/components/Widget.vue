<template lang="pug">
  .widget
    .graphic(:class="color")
      i(:class="icon")
    .text
      .count {{ count }}
      .label {{ title }}
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },
      color: String,
      count: {
        type: [Number, String],
        default: 'N/A'
      },
      title: String
    }
  };
</script>

<style lang="scss" scoped>
  .widget {
    display: flex;
    background: #FFF;
    height: 7.2em;
    box-shadow: 0 0 0 1px #d4d4d5, 
      0 2px 4px 0 rgba(34,36,38,.12), 
      0 2px 10px 0 rgba(34,36,38,.15);
    border-radius: 4px;
    @media (max-width: 425px) {
      height: 5em;
    }
    .graphic {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-basis: 40%;
      background: tomato;
      border-radius: 4px 0 0 4px;
      i.icon { 
        font-size: 3.5em;
        color: #FFF;
        text-shadow: 1px 1px 0px #232323;
      }
      &.green { background: #9CCC65 }
      &.red { background: #EF5350 }
      &.blue { background: #42A5F5 }
      &.yellow { background: #FFD54F}
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex-basis: 60%;
      padding: 1em;
      .count {
        font-size: 3.3em;
        @media (max-width: 1440px) {
          font-size: 2.8em;
        }
        @media (max-width: 425px) {
          font-size: 1.8em;
        }
      }
      .label {
        color: #67676B;
        font-size: 1.1em;
        font-weight: 500;
      }
    }
  }
</style>
