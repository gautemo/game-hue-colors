<script lang="ts">
import { router } from '../router'
import { toShow } from '../game/colors'
import { hueApi } from '@/HueApi'

export default {
  setup(){
    const play = () => router.push({name: 'game'})
    const changeLight = () => router.push({name: 'setup'})
    const changeBridge = () => {
      hueApi.clearSettings()
      router.push({name: 'setup'})
    }
    return { play, toShow, changeLight, changeBridge }
  }
}
</script>

<template>
  <section>
    <button @click="play" class="play">{{ $t('play') }}</button>
    <p>{{$t('nr_colors')}}</p>
    <div class="select">
      <button :class="{active: 4 === toShow}" @click="toShow = 4">4</button>
      <button :class="{active: 6 === toShow}" @click="toShow = 6">6</button>
      <button :class="{active: 8 === toShow}" @click="toShow = 8">8</button>
    </div>
    <div class="space"></div>
    <button @click="changeLight" class="setup">{{$t('change_light')}}</button>
    <button @click="changeBridge" class="setup">{{$t('change_bridge')}}</button>
  </section>
</template>

<style scoped>
section{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.play{
  font-size: 4rem;
  width: 70%;
  border-radius: 10px;
  border: none;
  background-image: linear-gradient(to top, #FA7921 0%, #E55934 100%);
  color: #fff;
  text-shadow: 2px 2px 2px #000;
  padding: 0.7rem;
}

p{
  color: #fff;
  text-shadow: 2px 2px 2px #000;
  font-size: 2rem;
  margin-bottom: 0;
}

.select{
  display: flex;
  background: #E6EFE9;
  border-radius: 100px;
  width: fit-content;
  overflow: hidden;
  border: 5px solid #E6EFE9;
}

.select button{
  font-size: 2rem;
  padding: 1rem 2rem;
  background: none;
  border: none;
  outline: none;
}

.select .active{
  background: #5f38c6;
  color: #fff;
}

.setup{
  min-width: 300px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  background: #E6EFE9;
  padding: 5px;
  margin: 1rem;
}

.space{
  height: 5rem;
}
</style>