import { reactive } from 'vue'
import { Bulb } from './game/colors'
import { clearStored, getStored, setStored } from './setup/stored'

type Bridge = {
  id: string;
  internalipaddress: string;
}

type HueState = {
  ip: string | null
  user: string | null
  light: string | null
  possibleIPs: string[]
  loadState: 'loading' | 'loaded'
  pendingLinkPressed: boolean
}

type Lights = {
  [key: string]: { name: string}
}

class HueApi{
  state = reactive<HueState>({
    ip: null,
    user: null,
    light: null,
    possibleIPs: [],
    loadState: 'loaded',
    pendingLinkPressed: false
  })

  constructor(){
    this.state.ip = getStored('ip')
    this.state.user = getStored('user')
    this.state.light = getStored('light')
    if(!this.state.user){
      this.initIP()
    }
  }

  async initIP(){
    this.state.loadState = 'loading'
    const response = await fetch('https://discovery.meethue.com/')
    const bridges = await response.json() as Bridge[]
    this.state.possibleIPs = bridges.map(b => b.internalipaddress)
    this.state.loadState = 'loaded'
  }

  async createUser(){
    for(const checkIP of this.state.possibleIPs){
      const response = await fetch(`http://${checkIP}/api`, {
        method: 'POST',
        body: JSON.stringify({
          devicetype: 'game-hue-colors'
        })
      })
      const json = await response.json() as any[]
      if(json.some(({error}) => error?.type === 101)){
        this.state.pendingLinkPressed = true
      }else{
        const username = json.map(({success}) => success.username).find(username => username)
        if(username){
          this.state.ip = checkIP
          this.state.user = username
          setStored('ip', checkIP)
          setStored('user', username)
          this.state.pendingLinkPressed = false
        }
      }
    }
  }

  async getLights(){
    const response = await fetch(`http://${this.state.ip}/api/${this.state.user}/lights`)
    const json = await response.json() as Lights
    return Object.entries(json).map(([id, {name}]) => ({id, name}))
  }

  blink(id: string){
    fetch(`http://${this.state.ip}/api/${this.state.user}/lights/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify({
        alert: 'select'
      })
    })
  }

  selectLightId(id: string){
    this.state.light = id
    setStored('light', id)
  }

  shouldCreateUser(){
    return !this.state.user && this.state.loadState === 'loaded' && this.state.possibleIPs.length > 0
  }

  changeColor(color: Bulb){
    fetch(`http://${this.state.ip}/api/${this.state.user}/lights/${this.state.light}/state`, {
      method: 'PUT',
      body: JSON.stringify(color)
    })
  }

  clearSettings(){
    this.state.ip = null
    this.state.user = null
    this.state.light = null
    this.state.possibleIPs = []
    this.state.loadState = 'loaded'
    this.state.pendingLinkPressed = false

    clearStored('ip')
    clearStored('user')
    clearStored('light')
    this.initIP()
  }
}

const hueApi = new HueApi()

export { hueApi }