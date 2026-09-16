export function getDetectorOptions() {
  return {
    inputSize: 320,
    scoreThreshold: 0.4,
  }
}

export function isUsableDetector(result) {
  return Boolean(result?.box && Number.isFinite(result.box.x) && Number.isFinite(result.box.y))
}
