function hasValidDimensions(videoWidth, videoHeight) {
  return Number.isFinite(videoWidth) && Number.isFinite(videoHeight) && videoWidth > 0 && videoHeight > 0
}

function hasFiniteBox(box) {
  if (!box) return false
  return [box.xMin, box.yMin, box.width, box.height].every(Number.isFinite)
}

export function normalizeFaceBox(box, videoWidth, videoHeight) {
  if (!hasFiniteBox(box) || !hasValidDimensions(videoWidth, videoHeight)) return null
  return {
    xMin: box.xMin / videoWidth,
    yMin: box.yMin / videoHeight,
    width: box.width / videoWidth,
    height: box.height / videoHeight,
  }
}

export function denormalizeFaceBox(box, videoWidth, videoHeight) {
  if (!hasFiniteBox(box) || !hasValidDimensions(videoWidth, videoHeight)) return null
  return {
    xMin: box.xMin * videoWidth,
    yMin: box.yMin * videoHeight,
    width: box.width * videoWidth,
    height: box.height * videoHeight,
  }
}
