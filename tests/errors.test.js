import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyCameraError, SCANNER_ERRORS } from '../src/scanner/errors.js'

test('permission-related camera errors are classified consistently', () => {
  assert.equal(classifyCameraError({ name: 'NotAllowedError' }), SCANNER_ERRORS.CAMERA_PERMISSION_DENIED)
  assert.equal(classifyCameraError({ name: 'SecurityError' }), SCANNER_ERRORS.CAMERA_PERMISSION_DENIED)
})

test('unknown and missing camera errors fall back to unavailable', () => {
  assert.equal(classifyCameraError({ name: 'NotFoundError' }), SCANNER_ERRORS.CAMERA_UNAVAILABLE)
  assert.equal(classifyCameraError(null), SCANNER_ERRORS.CAMERA_UNAVAILABLE)
})
