<script lang="ts">
import { ref, watchEffect } from 'vue'
import { hueApi } from '../HueApi'
import { router } from '../router'
import HueBridgeVisual from './HueBridgeVisual.vue'
import Loader from './Loader.vue'
import Language from '@/Language.vue'

export default {
  components: { HueBridgeVisual, Loader, Language },
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
  // setup(){
  //   const hueApi = {
  //     loadState: 'loaded',
  //     user: true,
  //     possibleIPs: [1],
  //     pendingLinkPressed: false
  //   }
  //   const lights: any = [{id: 1, name: 'Lighty'}]
  //   return { hueApi, lights }
  // }
}
</script>

<template>
  <h1>{{ $t('intro') }}</h1>
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
    <Language class="language"/>
  </main>
</template>

<style scoped>
h1{
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #fff;
  text-shadow: 2px 2px 2px #000;
  font-size: 1.5rem;
  letter-spacing: 1px;
}

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

main .language{
  margin-top: 3rem;
}

@media only screen and (max-height: 800px) {
  main .language{
    margin-top: 0.5rem;
  }
}
</style>