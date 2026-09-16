export function projectMirroredBox(box, sourceWidth, sourceHeight, targetWidth = 1280, targetHeight = 720) {
  if (!box || sourceWidth <= 0 || sourceHeight <= 0) return null
  const videoAspect = sourceWidth / sourceHeight
  const targetAspect = targetWidth / targetHeight
  let scale
  let offsetX = 0
  let offsetY = 0

  if (videoAspect < targetAspect) {
    scale = targetWidth / sourceWidth
    offsetY = (targetHeight - sourceHeight * scale) / 2
  } else {
    scale = targetHeight / sourceHeight
    offsetX = (targetWidth - sourceWidth * scale) / 2
  }

  const mirroredX = sourceWidth - box.xMin - box.width
  return {
    x: offsetX + mirroredX * scale,
    y: offsetY + box.yMin * scale,
    width: box.width * scale,
    height: box.height * scale,
  }
}
