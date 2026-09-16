import test from 'node:test'
import assert from 'node:assert/strict'
import { SCAN_PHASES, canTransition, transition } from '../src/scanner/scanState.js'

test('scanner allows the normal idle-to-complete lifecycle', () => {
  assert.equal(canTransition(SCAN_PHASES.IDLE, SCAN_PHASES.DETECTED), true)
  assert.equal(canTransition(SCAN_PHASES.DETECTED, SCAN_PHASES.SCANNING), true)
  assert.equal(canTransition(SCAN_PHASES.SCANNING, SCAN_PHASES.COMPLETE), true)
  assert.equal(transition(SCAN_PHASES.COMPLETE, SCAN_PHASES.IDLE), SCAN_PHASES.IDLE)
})

test('scanner rejects skipping directly from idle to complete', () => {
  assert.throws(() => transition(SCAN_PHASES.IDLE, SCAN_PHASES.COMPLETE), /Invalid scanner transition/)
})
