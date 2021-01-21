import { computed, ref, watchEffect } from 'vue'

type Bulb = { bri: number, hue: number, sat: number }
type Color = { color: string, bulb: Bulb, name: string }

const allColors: Color[] = [
  {
    name: 'red',
    color: 'red',
    bulb: {
      bri: 126,
      hue: 64698,
      sat: 254,
    }
  },
  {
    name: 'blue',
    color: '#004fff',
    bulb: {
      bri: 193,
      hue: 45970,
      sat: 254,
    }
  },
  {
    name: 'yellow',
    color: 'yellow',
    bulb: {
      bri: 206,
      hue: 11162,
      sat: 254,
    }
  },
  {
    name: 'green',
    color: '#38f34f',
    bulb: {
      bri: 181,
      hue: 25943,
      sat: 211,
    }
  },
  {
    name: 'pink',
    color: '#ff35f9',
    bulb: {
      bri: 190,
      hue: 54598,
      sat: 210,
    }
  },
  {
    name: 'purple',
    color: '#973aff',
    bulb: {
      bri: 112,
      hue: 50158,
      sat: 222,
    }
  },
  {
    name: 'orange',
    color: '#ff8d00',
    bulb: {
      bri: 169,
      hue: 2809,
      sat: 254,
    }
  },
  {
    name: 'lightblue',
    color: '#56c7ec',
    bulb: {
      bri: 181,
      hue: 40472,
      sat: 246,
    }
  },
]

const toShow = ref(Number(localStorage.getItem('nrLights') ?? 6))

watchEffect(() => localStorage.setItem('nrLights', toShow.value.toString()))

const colors = computed(() => allColors.slice(0, toShow.value))

export { colors, Bulb, Color, toShow }