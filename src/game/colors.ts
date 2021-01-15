type Bulb = { bri: number, hue: number, sat: number }
type Color = { color: string, bulb: Bulb }

const colors: Color[] = [
  {
    color: 'red',
    bulb: {
      bri: 126,
      hue: 64698,
      sat: 254,
    }
  },
  {
    color: 'purple',
    bulb: {
      bri: 126,
      hue: 52181,
      sat: 228,
    }
  },
  {
    color: 'blue',
    bulb: {
      bri: 193,
      hue: 45970,
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
    color: 'yellow',
    bulb: {
      bri: 206,
      hue: 11162,
      sat: 254,
    }
  },
  {
    color: 'pink',
    bulb: {
      bri: 126,
      hue: 59206,
      sat: 251,
    }
  },
  {
    color: 'orange',
    bulb: {
      bri: 169,
      hue: 2809,
      sat: 254,
    }
  },
  {
    color: 'lightblue',
    bulb: {
      bri: 181,
      hue: 40472,
      sat: 246,
    }
  },
]
export { colors, Bulb }