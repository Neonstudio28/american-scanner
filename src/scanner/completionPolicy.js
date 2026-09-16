export function shouldStartAnthem(progress, started) {
  return !started && progress >= 40
}

export function shouldComplete(progress) {
  return progress >= 100
}

export function shouldStartCompletionEffects(glitches) {
  return glitches > 14
}
