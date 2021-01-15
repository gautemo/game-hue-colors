<script lang="ts">
import { ref, watchEffect } from 'vue'
import { hueApi } from '../HueApi'
import { router } from '../router'
import HueBridgeVisual from './HueBridgeVisual.vue'
import Loader from './Loader.vue'

export default {
  components: { HueBridgeVisual, Loader },
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
  <main>
    <Loader v-if="hueApi.loadState === 'loading'"/>
    <p v-if="!hueApi.user && hueApi.possibleIPs.length === 0 && hueApi.loadState !== 'loading'">
      {{ $t('ip_not_found') }}
    </p>
    <div v-if="hueApi.pendingLinkPressed" class="connect">
      <HueBridgeVisual/>
      <p>{{ $t('press_hue_bridge')}}</p>
      <button @click="huePressed">{{ $t('done') }}</button>
    </div>
    <ul>
      <li v-for="light in lights" :key="light.id">
        <span>{{light.id}}: {{light.name}}</span>
        <button @click="selectLight(light.id)">{{$t('select')}}</button>
        <button @click="blink(light.id)">{{$t('blink')}}</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
}

.connect{
  display: flex;
  flex-direction: column;
  align-items: center;
}

p{
  color: #fff;
  text-shadow: 2px 2px 2px #000;
  font-size: 1.5rem;
  margin-top: 0;
}

button{
  min-width: 300px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  background: #E6EFE9;
  padding: 5px;
  margin: 1rem;
}

ul{
  list-style: none;
  padding: 0;
}

ul span{
  font-size: 2rem;
  color: #fff;
  text-shadow: 2px 2px 2px #000;
}
</style>