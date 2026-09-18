function safeCount(value) {
  return Number.isSafeInteger(value) && value >= 0 ? value : 0
}

export function updateDetectionStreaks({ detected, hits, misses }) {
  if (detected) return { hits: safeCount(hits) + 1, misses: 0 }
  return { hits: 0, misses: safeCount(misses) + 1 }
}

export function shouldStartScan(hits, requiredHits) {
  return hits >= requiredHits
}

export function shouldResetScan(misses, resetAfter) {
  return misses > resetAfter
}

export function clampProgress(value) {
  if (!Number.isFinite(value)) return 0
  return Math.min(100, Math.max(0, value))
}
