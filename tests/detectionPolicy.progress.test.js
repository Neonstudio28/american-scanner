import test from 'node:test'
import assert from 'node:assert/strict'
import { clampProgress } from '../src/scanner/detectionPolicy.js'

test('progress is clamped to the scanner range', () => {
  assert.equal(clampProgress(-10), 0)
  assert.equal(clampProgress(42.5), 42.5)
  assert.equal(clampProgress(150), 100)
})

test('non-finite progress cannot corrupt scan state', () => {
  assert.equal(clampProgress(Number.NaN), 0)
  assert.equal(clampProgress(Number.POSITIVE_INFINITY), 0)
})
