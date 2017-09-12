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
    props: ['icon', 'title', 'color', 'count']
  };
</script>

<style lang="scss" scoped>
  .widget {
    display: flex;
    background: #FFF;
    height: 9.5em;
    box-shadow: 0 0 0 1px #d4d4d5, 
      0 2px 4px 0 rgba(34,36,38,.12), 
      0 2px 10px 0 rgba(34,36,38,.15);
    @media (max-width: 425px) {
      height: 5em;
    }
    .graphic {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-basis: 40%;
      background: tomato;
      i.fa { 
        font-size: 3.5em;
        color: #FFF;
        padding: 5px;
      }
      &.green { background: #4CAF50 }
      &.red { background: #F44336}
      &.blue { background: #2196F3 }
      &.yellow { background: #FFEB3B}
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex-basis: 60%;
      padding: 1em;
      .count {
        font-size: 4em;
        font-weight: bold;;
        @media (max-width: 1440px) {
          font-size: 3em;
        }
        @media (max-width: 425px) {
          font-size: 2em;
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
