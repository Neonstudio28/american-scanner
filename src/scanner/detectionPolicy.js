export function updateDetectionStreaks({ detected, hits, misses }) {
  if (detected) return { hits: hits + 1, misses: 0 }
  return { hits: 0, misses: misses + 1 }
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
