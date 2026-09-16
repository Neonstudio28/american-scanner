export const SCANNER_ERRORS = Object.freeze({
  CAMERA_UNAVAILABLE: 'camera-unavailable',
  CAMERA_PERMISSION_DENIED: 'camera-permission-denied',
  DETECTOR_UNAVAILABLE: 'detector-unavailable',
  DETECTOR_FAILED: 'detector-failed',
})

export function classifyCameraError(error) {
  if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') {
    return SCANNER_ERRORS.CAMERA_PERMISSION_DENIED
  }
  return SCANNER_ERRORS.CAMERA_UNAVAILABLE
}
