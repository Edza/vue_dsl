<template>
<div>
  <div class="left">
    <h3>DSL</h3>
    <textarea id="dsl-area" v-model="dslText" @keyup="display"></textarea>
  </div>
  <div class="right">
    <h3>ĢENERĒTAIS JAVASCRIPT <span class="small-toggle" @click="toggleVisual">Apskatīt kodu</span></h3>
    <textarea id="js-area" v-if="!showTree" readonly v-model.lazy="genText" :class="[{ 'parser-error': isError }, 'read-only']"></textarea>
    <div v-else>
      <div>
        Komandā:
       <ul>
        <li v-for="(member) in members" :key="member">
          {{ member }}
        </li>
      </ul>
     </div>
      Prasības:
      <v-treeview v-model="treeData" :treeTypes="treeTypes" @selected="selected" :openAll="openAll" :contextItems="[]"></v-treeview>
      <div v-if="infoBox">
        Izvēlētais:<br/><br/>
        <span v-html="infoBox"></span>
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
import { PraModItem } from '@/dsl-compiler/common'

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
  infoBox = ''

  display () {
    this.displayCompile()
    this.displayVisual()
  }

  displayCompile () {
    const result : CompilerResult = this.compiler.translate(this.dslText)
    this.genText = result.text
    this.isError = result.isErrorMsg
    this.infoBox = ''

    if (this.isError) {
      this.showTree = false
    }
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

  selected (item: any) {
    const praModItem = item.model as PraModItem
    this.infoBox = praModItem.description
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.small-toggle {
  color: lightblue;
  text-decoration: underline;
}
h1 {
  display: inline-block;
}
h2 {
  display: inline;
}
.left {
  float: left;
  width: 58%;
}
.right {
  float: right;
  width: 42%;
}
#dsl-area {
  display: inline-block;
  width: 800px;
  height: 800px;
}

#js-area {
  display: inline-block;
  width: 590px;
  height: 800px;
}
.parser-error {
  border-color: #FF0000;
}
.read-only {
  background-color: #eaeaea;
}
</style>
