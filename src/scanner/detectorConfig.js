export function getDetectorOptions() {
  return {
    inputSize: 320,
    scoreThreshold: 0.4,
  }
}

export function isUsableDetector(result) {
  const box = result?.box
  if (!box) return false
  return [box.x, box.y, box.width, box.height].every(Number.isFinite) && box.width > 0 && box.height > 0
}
