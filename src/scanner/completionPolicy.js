export function shouldStartAnthem(progress, started) {
  return Number.isFinite(progress) && !started && progress >= 40
}

export function shouldComplete(progress) {
  return Number.isFinite(progress) && progress >= 100
}

export function shouldStartCompletionEffects(glitches) {
  return Number.isSafeInteger(glitches) && glitches > 14
}
