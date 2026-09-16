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
