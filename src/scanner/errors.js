export const SCANNER_ERRORS = Object.freeze({
  CAMERA_UNAVAILABLE: 'camera-unavailable',
  CAMERA_PERMISSION_DENIED: 'camera-permission-denied',
  CAMERA_NOT_FOUND: 'camera-not-found',
  CAMERA_BUSY: 'camera-busy',
  DETECTOR_UNAVAILABLE: 'detector-unavailable',
  DETECTOR_FAILED: 'detector-failed',
})

export function classifyCameraError(error) {
  if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') {
    return SCANNER_ERRORS.CAMERA_PERMISSION_DENIED
  }
  if (error?.name === 'NotFoundError' || error?.name === 'DevicesNotFoundError') {
    return SCANNER_ERRORS.CAMERA_NOT_FOUND
  }
  if (error?.name === 'NotReadableError' || error?.name === 'TrackStartError') {
    return SCANNER_ERRORS.CAMERA_BUSY
  }
  return SCANNER_ERRORS.CAMERA_UNAVAILABLE
}
