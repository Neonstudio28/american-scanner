export function elapsedMs(startTime, now = Date.now()) {
  if (!Number.isFinite(startTime) || !Number.isFinite(now)) return 0
  return Math.max(0, now - startTime)
}

export function percentElapsed(startTime, now, durationMs) {
  if (durationMs <= 0) return 0
  return Math.min(100, (elapsedMs(startTime, now) / durationMs) * 100)
}
