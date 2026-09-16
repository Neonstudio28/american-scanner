import test from 'node:test'
import assert from 'node:assert/strict'
import { shouldStartAnthem, shouldComplete, shouldStartCompletionEffects } from '../src/scanner/completionPolicy.js'

test('anthem starts exactly at the configured progress threshold', () => {
  assert.equal(shouldStartAnthem(39, false), false)
  assert.equal(shouldStartAnthem(40, false), true)
  assert.equal(shouldStartAnthem(40, true), false)
})

test('completion effects have deterministic boundaries', () => {
  assert.equal(shouldComplete(99.9), false)
  assert.equal(shouldComplete(100), true)
  assert.equal(shouldStartCompletionEffects(14), false)
  assert.equal(shouldStartCompletionEffects(15), true)
})
