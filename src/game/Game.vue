<script lang="ts">
import { onMounted, ref } from 'vue'
import { router } from '../router'
import { colors, Color } from './colors'
import { hueApi } from '../HueApi';
import { playAudio } from './sound';

const random = (max: number) => Math.floor(Math.random() * Math.floor(max));

export default {
  setup(){
    const toMenu = () => router.push({name: 'menu'})

    const color = ref<Color | null>(null)
    const startColor = () => {
      let newColor = colors.value[random(colors.value.length)] 
      while(newColor.color === color.value?.color){
        newColor = colors.value[random(colors.value.length)] 
      }
      color.value = newColor
      hueApi.changeColor(newColor.bulb)
    }
    startColor()

    const flipped = ref<Color[]>([])

    const pick = (pickColor: Color) => {
      if(color.value?.color === pickColor.color){
        flipped.value = []
        startColor()
        playAudio(pickColor.name)
      }else{
        flipped.value.push(pickColor)
      }
    }

    const mainEl = ref<Element | null>(null)
    onMounted(() => {
      mainEl.value?.requestFullscreen()
    })

    return { toMenu, colors, flipped, pick, mainEl }
  }
}
</script>

<template>
  <main :style="{'--colors': colors.length / 2}" ref="mainEl">
    <section>
      <div 
        v-for="color in colors" 
        :key="color" 
        :style="{ background: flipped.some(c => c.color === color.color) ? '#333' : color.color }" 
        @click="pick(color)"
        class="square">
      </div>
    </section>
    <nav>
      <svg @click="toMenu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M4 18h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h8c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm17.3 7.88L17.42 12l2.88-2.88a.996.996 0 1 0-1.41-1.41L15.3 11.3a.996.996 0 0 0 0 1.41l3.59 3.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42z" fill="currentColor"></path></svg>
    </nav>
  </main>
</template>

<style scoped>
main{
  display: flex;
  height: 100%;
}

section{
  flex: 1;
  display: grid;
  padding: 5px;
  gap: 5px;
  grid-template-columns: repeat(var(--colors, 4), 1fr);
  background: rgba(255, 255, 255, 0.9);
}

nav{
  box-shadow: -2px 0 4px rgba(78, 78, 78, 0.76);
  padding: 5px;
  background: rgb(247, 247, 247);
}

nav svg{
  cursor: pointer;
}

.square{
  border-radius: 12px;
  cursor: pointer;
  box-shadow: inset 0px 0px 18px 10px rgba(51, 51, 51, 0.5);
  transition: background-color 0.8s ease-in-out;
}
</style>

