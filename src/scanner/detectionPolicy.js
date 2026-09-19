function safeCount(value) {
  return Number.isSafeInteger(value) && value >= 0 ? value : 0
}

function incrementCount(value) {
  return Math.min(Number.MAX_SAFE_INTEGER, safeCount(value) + 1)
}

function isValidThreshold(value) {
  return Number.isSafeInteger(value) && value >= 0
}

export function updateDetectionStreaks({ detected, hits, misses }) {
  if (detected) return { hits: incrementCount(hits), misses: 0 }
  return { hits: 0, misses: incrementCount(misses) }
}

export function shouldStartScan(hits, requiredHits) {
  return isValidThreshold(hits) && isValidThreshold(requiredHits) && requiredHits > 0 && hits >= requiredHits
}

export function shouldResetScan(misses, resetAfter) {
  return isValidThreshold(misses) && isValidThreshold(resetAfter) && misses > resetAfter
}

export function clampProgress(value) {
  if (!Number.isFinite(value)) return 0
  return Math.min(100, Math.max(0, value))
}
