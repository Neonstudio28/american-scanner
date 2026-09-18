import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyCameraError, SCANNER_ERRORS } from '../src/scanner/errors.js'

test('permission-related camera errors are classified consistently', () => {
  assert.equal(classifyCameraError({ name: 'NotAllowedError' }), SCANNER_ERRORS.CAMERA_PERMISSION_DENIED)
  assert.equal(classifyCameraError({ name: 'SecurityError' }), SCANNER_ERRORS.CAMERA_PERMISSION_DENIED)
})

test('missing camera devices are classified separately', () => {
  assert.equal(classifyCameraError({ name: 'NotFoundError' }), SCANNER_ERRORS.CAMERA_NOT_FOUND)
  assert.equal(classifyCameraError({ name: 'DevicesNotFoundError' }), SCANNER_ERRORS.CAMERA_NOT_FOUND)
})

test('busy or unreadable cameras are classified separately', () => {
  assert.equal(classifyCameraError({ name: 'NotReadableError' }), SCANNER_ERRORS.CAMERA_BUSY)
  assert.equal(classifyCameraError({ name: 'TrackStartError' }), SCANNER_ERRORS.CAMERA_BUSY)
})

test('unknown and missing camera errors fall back to unavailable', () => {
  assert.equal(classifyCameraError({ name: 'UnknownError' }), SCANNER_ERRORS.CAMERA_UNAVAILABLE)
  assert.equal(classifyCameraError(null), SCANNER_ERRORS.CAMERA_UNAVAILABLE)
})
