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
h1 {
  display: inline-block;
}
h2 {
  display: inline;
}
.left {
  float: left;
  width: 50%;
}
.right {
  float: right;
  width: 50%;
}
textarea {
  display: inline-block;
  width: 700px;
  height: 800px;
}
.parser-error {
  border-color: #FF0000;
}
.read-only {
  background-color: #eaeaea;
}
</style>
