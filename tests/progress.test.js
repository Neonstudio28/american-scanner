import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateProgress, isCompleteProgress } from '../src/scanner/progress.js'

test('progress reaches fifty percent halfway through a scan', () => {
  assert.equal(calculateProgress(1000, 3000, 4000), 50)
})

test('progress cannot exceed one hundred percent', () => {
  assert.equal(calculateProgress(1000, 7000, 4000), 100)
  assert.equal(isCompleteProgress(100), true)
})

test('progress rejects invalid timing inputs', () => {
  assert.equal(calculateProgress(Number.NaN, 3000, 4000), 0)
  assert.equal(calculateProgress(1000, Number.POSITIVE_INFINITY, 4000), 0)
  assert.equal(calculateProgress(1000, 3000, Number.POSITIVE_INFINITY), 0)
  assert.equal(calculateProgress(1000, 3000, 0), 0)
})

test('progress clamps backwards clocks to zero', () => {
  assert.equal(calculateProgress(3000, 1000, 4000), 0)
})

test('completion only accepts finite progress at or above one hundred', () => {
  assert.equal(isCompleteProgress(99.999), false)
  assert.equal(isCompleteProgress(100), true)
  assert.equal(isCompleteProgress(120), true)
  assert.equal(isCompleteProgress(Number.NaN), false)
  assert.equal(isCompleteProgress(Number.POSITIVE_INFINITY), false)
  assert.equal(isCompleteProgress(-1), false)
})
