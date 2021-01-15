import { computed, ref, watchEffect } from 'vue'

type Bulb = { bri: number, hue: number, sat: number }
type Color = { color: string, bulb: Bulb }

const allColors: Color[] = [
  {
    color: 'red',
    bulb: {
      bri: 126,
      hue: 64698,
      sat: 254,
    }
  },
  {
    // blue
    color: '#004fff',
    bulb: {
      bri: 193,
      hue: 45970,
      sat: 254,
    }
  },
  {
    color: 'yellow',
    bulb: {
      bri: 206,
      hue: 11162,
      sat: 254,
    }
  },
  {
    // green
    color: '#12c112',
    bulb: {
      bri: 181,
      hue: 25943,
      sat: 211,
    }
  },
  {
    // pink
    color: '#ff4299',
    bulb: {
      bri: 126,
      hue: 59206,
      sat: 251,
    }
  },
  {
    // purple
    color: '#a200aa',
    bulb: {
      bri: 126,
      hue: 52181,
      sat: 228,
    }
  },
  {
    // orange
    color: '#ff8d00',
    bulb: {
      bri: 169,
      hue: 2809,
      sat: 254,
    }
  },
  {
    // lightblue
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