import test from 'node:test'
import assert from 'node:assert/strict'
import { elapsedMs, percentElapsed } from '../src/scanner/timing.js'

test('elapsed time never becomes negative when the clock moves backwards', () => {
  assert.equal(elapsedMs(1_000, 900), 0)
})

test('elapsed time rejects non-finite timestamps', () => {
  assert.equal(elapsedMs(Number.NaN, 1_000), 0)
  assert.equal(elapsedMs(1_000, Number.POSITIVE_INFINITY), 0)
})

test('elapsed percentage is clamped at completion', () => {
  assert.equal(percentElapsed(0, 2_000, 1_000), 100)
})

test('elapsed percentage rejects invalid durations', () => {
  assert.equal(percentElapsed(0, 500, 0), 0)
  assert.equal(percentElapsed(0, 500, -1), 0)
  assert.equal(percentElapsed(0, 500, Number.NaN), 0)
  assert.equal(percentElapsed(0, 500, Number.POSITIVE_INFINITY), 0)
})
