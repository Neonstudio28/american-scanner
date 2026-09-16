export function isValidBox(box) {
  if (!box) return false
  const values = [box.xMin, box.yMin, box.width, box.height]
  return values.every(Number.isFinite) && box.width >= 0 && box.height >= 0
}

export function hasUsableVideo(video) {
  return Boolean(video && video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0)
}
