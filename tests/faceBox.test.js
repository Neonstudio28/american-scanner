import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeFaceBox, denormalizeFaceBox } from '../src/scanner/faceBox.js'

test('face boxes can be normalized and restored without changing geometry', () => {
  const original = { xMin: 160, yMin: 120, width: 320, height: 240 }
  const normalized = normalizeFaceBox(original, 640, 480)
  assert.deepEqual(denormalizeFaceBox(normalized, 640, 480), original)
})

test('invalid video dimensions do not produce unusable coordinates', () => {
  const box = { xMin: 1, yMin: 1, width: 1, height: 1 }
  assert.equal(normalizeFaceBox(box, 0, 480), null)
  assert.equal(normalizeFaceBox(box, Number.NaN, 480), null)
  assert.equal(normalizeFaceBox(box, 640, Number.POSITIVE_INFINITY), null)
  assert.equal(denormalizeFaceBox(box, -1, 480), null)
})

test('non-finite face geometry is rejected before projection', () => {
  assert.equal(normalizeFaceBox({ xMin: Number.NaN, yMin: 1, width: 1, height: 1 }, 640, 480), null)
  assert.equal(denormalizeFaceBox({ xMin: 0.1, yMin: 0.1, width: Number.POSITIVE_INFINITY, height: 0.2 }, 640, 480), null)
})

test('negative face dimensions are rejected', () => {
  assert.equal(normalizeFaceBox({ xMin: 0, yMin: 0, width: -1, height: 20 }, 640, 480), null)
  assert.equal(denormalizeFaceBox({ xMin: 0, yMin: 0, width: 0.2, height: -0.1 }, 640, 480), null)
})
