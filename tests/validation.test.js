import test from 'node:test'
import assert from 'node:assert/strict'
import { hasUsableVideo, isValidBox } from '../src/scanner/validation.js'

test('valid face boxes require finite non-negative geometry', () => {
  assert.equal(isValidBox({ xMin: 1, yMin: 2, width: 10, height: 20 }), true)
  assert.equal(isValidBox({ xMin: 1, yMin: 2, width: -1, height: 20 }), false)
  assert.equal(isValidBox({ xMin: Number.NaN, yMin: 2, width: 10, height: 20 }), false)
  assert.equal(isValidBox(null), false)
})

test('usable video requires metadata and positive dimensions', () => {
  assert.equal(hasUsableVideo({ readyState: 2, videoWidth: 640, videoHeight: 480 }), true)
  assert.equal(hasUsableVideo({ readyState: 1, videoWidth: 640, videoHeight: 480 }), false)
  assert.equal(hasUsableVideo({ readyState: 2, videoWidth: 0, videoHeight: 480 }), false)
  assert.equal(hasUsableVideo(null), false)
})

test('non-finite video metadata is never considered usable', () => {
  assert.equal(hasUsableVideo({ readyState: Number.NaN, videoWidth: 640, videoHeight: 480 }), false)
  assert.equal(hasUsableVideo({ readyState: 2, videoWidth: Number.POSITIVE_INFINITY, videoHeight: 480 }), false)
  assert.equal(hasUsableVideo({ readyState: 2, videoWidth: 640, videoHeight: Number.NaN }), false)
})
