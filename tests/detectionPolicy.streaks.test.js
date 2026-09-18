import test from 'node:test'
import assert from 'node:assert/strict'
import { updateDetectionStreaks } from '../src/scanner/detectionPolicy.js'

test('a detection increments hits and clears misses', () => {
  assert.deepEqual(updateDetectionStreaks({ detected: true, hits: 4, misses: 3 }), { hits: 5, misses: 0 })
})

test('a miss clears hits and increments misses', () => {
  assert.deepEqual(updateDetectionStreaks({ detected: false, hits: 4, misses: 3 }), { hits: 0, misses: 4 })
})

test('invalid counters cannot poison detection streak state', () => {
  assert.deepEqual(updateDetectionStreaks({ detected: true, hits: Number.NaN, misses: 2 }), { hits: 1, misses: 0 })
  assert.deepEqual(updateDetectionStreaks({ detected: false, hits: 2, misses: -4 }), { hits: 0, misses: 1 })
  assert.deepEqual(updateDetectionStreaks({ detected: true, hits: 1.5, misses: 0 }), { hits: 1, misses: 0 })
})
