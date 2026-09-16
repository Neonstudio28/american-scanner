import { clampProgress } from './detectionPolicy.js'

export function calculateProgress(startTime, now, durationMs) {
  if (!Number.isFinite(startTime) || !Number.isFinite(now) || durationMs <= 0) return 0
  return clampProgress(((now - startTime) / durationMs) * 100)
}

export function isCompleteProgress(progress) {
  return clampProgress(progress) >= 100
}
