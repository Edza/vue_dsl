<template>
<div>
  <div class="left">
    <h3>DSL</h3>
    <textarea v-model="dslText" @keyup="displayCompile"></textarea>
  </div>
  <div class="right">
    <h3>GENERATED JAVASCRIPT</h3>
    <textarea readonly v-model="genText" :class="[{ 'parser-error': isError }, 'read-only']"></textarea>
  </div>
</div>
</template>

<script lang="ts">

// some weird linter bug
/* eslint space-infix-ops: "off" */
import { Component, Prop, Vue } from 'vue-property-decorator'
import DslText from '@/assets/dsl-text-initial'
import { Compiler, CompilerResult } from '@/dsl-compiler/compiler'

@Component
export default class Generator extends Vue {
  dslText = DslText.trim()
  genText = ''
  isError = false
  compiler = new Compiler()

  displayCompile () {
    const result : CompilerResult = this.compiler.translate(this.dslText)
    this.genText = result.text
    this.isError = result.isErrorMsg
  }

  mounted () {
    this.displayCompile()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
