export function projectMirroredBox(box, sourceWidth, sourceHeight, targetWidth = 1280, targetHeight = 720) {
  const dimensions = [sourceWidth, sourceHeight, targetWidth, targetHeight]
  const boxValues = box && [box.xMin, box.yMin, box.width, box.height]
  if (
    !boxValues?.every(Number.isFinite)
    || box.width < 0
    || box.height < 0
    || !dimensions.every(value => Number.isFinite(value) && value > 0)
  ) return null

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
