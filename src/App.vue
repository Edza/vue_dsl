<template>
  <div id="app">
    <h2>PraMod</h2>
    <p>
      <b>Realizētā funckionalitāte:</b>
        Ar DSL var aprakstīt visu PraMod funkcionalitāti izņemot norādīt savstarpēji konfliktējošas prasības. Tiek uzģenerēts universāls JSONs, kurš strādā kā Javascript kods.
        Likumi ir ļoti brīvi un tiem ir jāsatur tikai atslēgvārdi kā "Jauna prasībā" vai "Komandā prasībāi", ārpus šiem atslēgvārdiem var ievadīt brīvu tekstu. Strādā
        hierarhiska vizualizācija, izdarītu procentu aprēķins, un detaļu apskatīšana kādai prasībai.
      <br/><b>Strādājošie likumi:</b>
        Modeļa likumi: nedrīkst būt saknes prasība tehniskā, Prasību likumi: jābūt atbildīgajam, jābūt piesķirti komandas locekļi.
    </p>
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
