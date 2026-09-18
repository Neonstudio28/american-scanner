import { clampProgress } from './detectionPolicy.js'

export const SCORE_MULTIPLIERS = Object.freeze({
  dna: 1.2,
  culture: 0.9,
  freedom: 1.1,
  eagle: 0.95,
  burger: 1.3,
})

function roundScore(value) {
  return Math.round(value * 100) / 100
}

export function calculateScanScores(progress) {
  const safeProgress = clampProgress(progress)
  return Object.fromEntries(
    Object.entries(SCORE_MULTIPLIERS).map(([key, multiplier]) => [
      key,
      roundScore(Math.min(100, safeProgress * multiplier)),
    ]),
  )
}
