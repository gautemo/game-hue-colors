<script lang="ts">
import { ref, watchEffect } from 'vue'
import { hueApi } from '../HueApi'
import { router } from '../router'
import HueBridgeVisual from './HueBridgeVisual.vue'

export default {
  components: { HueBridgeVisual },
  setup(){
    
    watchEffect(() => {
      if(hueApi.shouldCreateUser()){
        hueApi.createUser()
      }
    })

    const lights = ref<{id: string, name: string}[]>([])
    watchEffect(async () => {
      if(hueApi.state.user && hueApi.state.ip){
        lights.value = await hueApi.getLights()
        console.log(lights.value)
      }
    })

    const huePressed = () => {
      hueApi.createUser()
    }

    const blink = (id: string) => hueApi.blink(id)
    const selectLight = (id: string) => {
      hueApi.selectLightId(id)
      router.push({name: 'menu'})
    }

    return { hueApi: hueApi.state, huePressed, lights, blink, selectLight }
  }
}
</script>

<template>
  <div v-if="!hueApi.user && hueApi.possibleIPs.length === 0">
    {{ $t('ip_not_found') }}
  </div>
  <div v-if="hueApi.pendingLinkPressed">
    <HueBridgeVisual/>
    {{ $t('press_hue_bridge')}}
    <button @click="huePressed">{{ $t('done') }}</button>
  </div>
  <ul>
    <li v-for="light in lights" :key="light.id">
      <span>{{light.id}}: {{light.name}}</span>
      <button @click="selectLight(light.id)">{{$t('select')}}</button>
      <button @click="blink(light.id)">{{$t('blink')}}</button>
    </li>
  </ul>
</template>

<style scoped>

</style>