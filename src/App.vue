<template>
  <div id="app">
    <h2>PraMod GENERATOR</h2>
    <Generator/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Generator from './components/Generator.vue'

@Component({
  components: {
  Generator,
  },
  })
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
