export function isValidBox(box) {
  if (!box) return false
  const values = [box.xMin, box.yMin, box.width, box.height]
  return values.every(Number.isFinite) && box.width >= 0 && box.height >= 0
}

export function hasUsableVideo(video) {
  if (!video) return false
  return Number.isFinite(video.readyState)
    && video.readyState >= 2
    && Number.isFinite(video.videoWidth)
    && video.videoWidth > 0
    && Number.isFinite(video.videoHeight)
    && video.videoHeight > 0
}
