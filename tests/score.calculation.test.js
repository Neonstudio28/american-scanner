import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateScanScores } from '../src/scanner/score.js'

test('score multipliers produce capped scanner metrics', () => {
  assert.deepEqual(calculateScanScores(50), {
    dna: 60,
    culture: 45,
    freedom: 55.00000000000001,
    eagle: 47.5,
    burger: 65,
  })
})

test('scores never exceed one hundred', () => {
  const scores = calculateScanScores(100)
  assert.ok(Object.values(scores).every(value => value <= 100))
})
