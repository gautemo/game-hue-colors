const playAudio = async (color: string) => {
  const pling = new Audio(`/sounds/pling.mp3`)
  pling.addEventListener('ended', () => {
    const audio = new Audio(`/sounds/no/${color}.mp3`)
    audio.play()
  })
  pling.play()
}

export { playAudio }