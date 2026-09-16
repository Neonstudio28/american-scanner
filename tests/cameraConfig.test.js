import test from 'node:test'
import assert from 'node:assert/strict'
import { getCameraConstraints } from '../src/scanner/cameraConfig.js'

test('camera requests front-facing video without microphone access', () => {
  const constraints = getCameraConstraints()
  assert.equal(constraints.video.facingMode, 'user')
  assert.equal(constraints.audio, false)
  assert.equal(constraints.video.width.ideal, 1280)
  assert.equal(constraints.video.height.ideal, 720)
})
