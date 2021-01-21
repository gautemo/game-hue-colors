import { i18n } from '@/i18n'

const playAudio = async (color: string) => {
  const pling = new Audio(`/sounds/pling.mp3`)
  pling.addEventListener('ended', () => {
    const locale = i18n.global.locale
    const audio = new Audio(`/sounds/${locale}/${color}.mp3`)
    audio.play()
  })
  pling.play()
}

export { playAudio }