<template>
  <div id="app">
    <div v-if="view == Display.Generator">
      <h2 @click="switchView(Display.Reverser)">PraMod GENERATOR. Switch to reverser</h2>
      <Generator/>
    </div>
    <div v-if="view == Display.Reverser">
      <h2 @click="switchView(Display.Generator)">PraMod REVERSER. Switch to generator</h2>
      <Reverser/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Generator from './components/Generator.vue'
import Reverser from './components/Reverser.vue'

// not enabled
// import VueHighlightJS from 'vue-highlightjs'
// Vue.use(VueHighlightJS)

export enum DisplayMode {
    Generator = 1,
    Reverser,
}

@Component({
  components: {
  Generator,
  Reverser
  },
  })
export default class App extends Vue {
  Display = DisplayMode
  view : DisplayMode = DisplayMode.Generator

  switchView (displayMode : DisplayMode) {
    this.view = displayMode
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
  margin-top: 10px;
}
h1 {
  display: inline-block;
}
h2 {
  display: inline;
  text-decoration: underline;
  color: lightblue;
}
h2:hover {
  color: blue;
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
