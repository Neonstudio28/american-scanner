import test from 'node:test'
import assert from 'node:assert/strict'
import { getDetectorOptions, isUsableDetector } from '../src/scanner/detectorConfig.js'

test('detector options preserve the intended lightweight model settings', () => {
  assert.deepEqual(getDetectorOptions(), { inputSize: 320, scoreThreshold: 0.4 })
})

test('invalid detector results are rejected before projection', () => {
  assert.equal(isUsableDetector(null), false)
  assert.equal(isUsableDetector({ box: { x: Number.NaN, y: 2, width: 10, height: 10 } }), false)
  assert.equal(isUsableDetector({ box: { x: 2, y: 3, width: Number.POSITIVE_INFINITY, height: 10 } }), false)
  assert.equal(isUsableDetector({ box: { x: 2, y: 3, width: 0, height: 10 } }), false)
  assert.equal(isUsableDetector({ box: { x: 2, y: 3, width: 10, height: -1 } }), false)
  assert.equal(isUsableDetector({ box: { x: 2, y: 3, width: 10, height: 12 } }), true)
})
