<script>
import { router } from '../router'

export default {
  setup(){
    const play = () => router.push({name: 'game'})
    return { play }
  }
}
</script>

<template>
  <section>
    <button @click="play">{{ $t('play') }}</button>
  </section>
</template>

<style scoped>

</style>