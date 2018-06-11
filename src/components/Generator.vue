<template>
<div>
  <div class="left">
    <h3>DSL</h3>
    <textarea v-model="dslText" @keyup="display"></textarea>
  </div>
  <div class="right">
    <h3>GENERATED JAVASCRIPT <span class="small-toggle" @click="toggleVisual">Toggle visual</span></h3>
    <textarea v-if="!showTree" readonly v-model="genText" :class="[{ 'parser-error': isError }, 'read-only']"></textarea>
    <div v-else>
      Prasības:
      <v-treeview v-model="treeData" :treeTypes="treeTypes" @selected="selected" :openAll="openAll" :contextItems="[]"></v-treeview>
      <div>
        Komandā:
       <ul id="example-1">
        <li v-for="(member) in members" :key="member">
          {{ member }}
        </li>
      </ul>
     </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">

// some weird linter bug
/* eslint space-infix-ops: "off" */
import { Component, Prop, Vue } from 'vue-property-decorator'
import VTreeview from 'v-treeview'

import DslText from '@/assets/dsl-text-initial'
import { Compiler, CompilerResult } from '@/dsl-compiler/compiler'
import TreeLoader from './helpers/tree-loader'

@Component({
  components: {
  VTreeview,
  },
  })
export default class Generator extends Vue {
  compiler = new Compiler()
  treeLoader = new TreeLoader()
  treeTypes = this.treeLoader.types
  dslText = DslText.trim()
  genText = ''
  isError = false
  showTree = false
  treeData = null
  openAll = false
  members : string[] = []

  display () {
    this.displayCompile()
    this.displayVisual()
  }

  displayCompile () {
    const result : CompilerResult = this.compiler.translate(this.dslText)
    this.genText = result.text
    this.isError = result.isErrorMsg
  }

  toggleVisual () {
    this.showTree = !this.showTree
    this.displayVisual()
  }

  displayVisual () {
    if (this.showTree) {
      const model = this.compiler.translate(this.dslText).model
      this.members = model.members
      this.treeData = this.treeLoader.process(model)
    } else {
      this.treeData = null
    }
  }

  mounted () {
    this.displayCompile()
    this.toggleVisual()
  }

  selected (model: any) {
    console.log(model)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.small-toggle {
  color: lightblue;
  text-decoration: underline;
}
</style>
