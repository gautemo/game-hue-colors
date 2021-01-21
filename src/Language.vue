<script lang="ts">
import { ref } from 'vue'
import { changeLocale, i18n } from './i18n'
export default {
  setup(){
    const current = ref(i18n.global.locale)
    const change = (locale: 'no' | 'nl') => {
      changeLocale(locale)
      current.value = locale
    }
    return { change, current }
  }
}
</script>

<template>
  <section class="row">
    <div @click="change('no')" :class="{selected: current === 'no'}">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" width="5em" height="5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="#EF2B2D" d="M10 5H4a4 4 0 0 0-4 4v6h10V5zm22 0H16v10h20V9a4 4 0 0 0-4-4zM10 31H4a4 4 0 0 1-4-4v-6h10v10zm22 0H16V21h20v6a4 4 0 0 1-4 4z"></path><path fill="#002868" d="M14.5 5h-2.944l-.025 11.5H0v3h11.525L11.5 31h3V19.5H36v-3H14.5z"></path><path fill="#EEE" d="M14.5 31H16V21h20v-1.5H14.5zM16 5h-1.5v11.5H36V15H16zm-4.5 0H10v10H0v1.5h11.5zM0 19.5V21h10v10h1.5V19.5z"></path></svg>
    </div>
    <div @click="change('nl')" :class="{selected: current === 'nl'}">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" width="5em" height="5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="#EEE" d="M0 14h36v8H0z"></path><path fill="#AE1F28" d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z"></path><path fill="#20478B" d="M4 31h28a4 4 0 0 0 4-4v-5H0v5a4 4 0 0 0 4 4z"></path></svg>
    </div>
  </section>
</template>

<style scoped>
section.row{
  height: fit-content;
  display: flex;
  gap: 1rem;
  flex-direction: row;
  margin-top: 1rem;
}

div{
  position: relative;
}

.selected::after{
  position: absolute;
  right: 3px;
  bottom: 13px;
  content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='1.2em' height='1.2em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'><path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.29 13.29a.996.996 0 0 1-1.41 0L5.71 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.58 7.59z' fill='white' fill-opacity='0.7'></path></svg>");
}
</style>

