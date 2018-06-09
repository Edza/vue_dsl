<template>
<div>
  <div class="left">
    <h3>GENERATED DSL</h3>
    <textarea readonly v-model="backGenText" :class="[{ 'parser-error': isError }, 'read-only']"></textarea>
  </div>
 <div class="left">
    <h3>Javascript</h3>
    <textarea v-model="jsText" @keyup="displayBackCompile"></textarea>
  </div>
</div>
</template>

<script lang="ts">

// some weird linter bug
/* eslint space-infix-ops: "off" */
import { Component, Prop, Vue } from 'vue-property-decorator'
import DslJsExample from '@/assets/dsl-js-example'
import { Compiler, CompilerResult } from '@/dsl-compiler/compiler'

type Translator = (input : string) => CompilerResult

@Component
export default class Reverser extends Vue {
  jsText = DslJsExample.trim()
  backGenText = ''
  isError = false
  compile : Translator = new Compiler().translate

  displayBackCompile () {
    const result : CompilerResult = this.compile(this.jsText)
    this.backGenText = result.text
    this.isError = result.isErrorMsg
  }

  mounted () {
    this.displayBackCompile()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
