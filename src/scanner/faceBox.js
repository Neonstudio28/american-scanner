export function normalizeFaceBox(box, videoWidth, videoHeight) {
  if (!box || videoWidth <= 0 || videoHeight <= 0) return null
  return {
    xMin: box.xMin / videoWidth,
    yMin: box.yMin / videoHeight,
    width: box.width / videoWidth,
    height: box.height / videoHeight,
  }
}

export function denormalizeFaceBox(box, videoWidth, videoHeight) {
  if (!box || videoWidth <= 0 || videoHeight <= 0) return null
  return {
    xMin: box.xMin * videoWidth,
    yMin: box.yMin * videoHeight,
    width: box.width * videoWidth,
    height: box.height * videoHeight,
  }
}
