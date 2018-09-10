<template>
  <div id="app">
    {{msg}}
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      msg: 'Constitución'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
    width: 244px;
  height: 55px;
  object-fit: contain;
}
</style>
