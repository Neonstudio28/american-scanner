import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeFaceBox, denormalizeFaceBox } from '../src/scanner/faceBox.js'

test('face boxes can be normalized and restored without changing geometry', () => {
  const original = { xMin: 160, yMin: 120, width: 320, height: 240 }
  const normalized = normalizeFaceBox(original, 640, 480)
  assert.deepEqual(denormalizeFaceBox(normalized, 640, 480), original)
})

test('invalid video dimensions do not produce unusable coordinates', () => {
  assert.equal(normalizeFaceBox({ xMin: 1, yMin: 1, width: 1, height: 1 }, 0, 480), null)
})
