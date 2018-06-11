<template>
<div>
  <div class="left">
    <h3>DSL</h3>
    <textarea v-model="dslText" @keyup="display"></textarea>
  </div>
  <div class="right">
    <h3>GENERATED JAVASCRIPT <span class="small-toggle" @click="toggleVisual">Toggle visual</span></h3>
    <textarea v-if="!showTree" readonly v-model="genText" :class="[{ 'parser-error': isError }, 'read-only']"></textarea>
    <!-- <vue-tree-list v-else @click="treeClick"
                :model="treeData"
                default-tree-node-name="Prasība"
                default-leaf-node-name="Apakšprasība"></vue-tree-list> -->
     <!-- <v-jstree v-else :data="treeData" show-checkbox multiple allow-batch whole-row @item-click="itemClick"></v-jstree> -->
     <v-treeview v-model="treeData" :treeTypes="treeTypes" @selected="selected" :openAll="openAll" :contextItems="[]"></v-treeview>
  </div>
</div>
</template>

<script lang="ts">

// some weird linter bug
/* eslint space-infix-ops: "off" */
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
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
  dslText = DslText.trim()
  genText = ''
  isError = false
  showTree = false
  treeData = null
  openAll = false

  treeTypes : any = [
    {
      type: 'Tech',
      icon: 'far fa-hospital',
      max_children: 10,
      max_depth: 10,
    },
    {
      type: 'Client',
      icon: 'far fa-user',
      max_children: 10,
      max_depth: 10,
    },
  ]

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
