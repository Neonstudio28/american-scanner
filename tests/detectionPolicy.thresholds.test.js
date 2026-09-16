import test from 'node:test'
import assert from 'node:assert/strict'
import { shouldStartScan, shouldResetScan } from '../src/scanner/detectionPolicy.js'

test('scan begins once the required hit threshold is reached', () => {
  assert.equal(shouldStartScan(4, 5), false)
  assert.equal(shouldStartScan(5, 5), true)
  assert.equal(shouldStartScan(6, 5), true)
})

test('scan resets only after the miss threshold is exceeded', () => {
  assert.equal(shouldResetScan(15, 15), false)
  assert.equal(shouldResetScan(16, 15), true)
})
