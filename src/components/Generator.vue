<template>
  <div>
    <h3>DSL</h3>
    <textarea v-model="dslText" @keyup="displayCompile"></textarea>
    <h3>Javascript</h3>
    <textarea v-model="genText" :class="{ 'parser-error': isError }"></textarea>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import DslText from '@/assets/dsl-text-initial'
import { Compiler, CompilerResult } from '@/dsl-compiler/compiler'

type Translator = (input : string) => CompilerResult

@Component
export default class Generator extends Vue {
  dslText = DslText.trim()
  genText = ''
  isError = false
  compile : Translator = new Compiler().translate

  displayCompile () {
    const result : CompilerResult = this.compile(this.dslText)
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
textarea {
  display: inline-block;
  width: 200px;
  height: 200px;
}
.parser-error {
  border-color: #FF0000;
}
</style>
