import test from 'node:test'
import assert from 'node:assert/strict'
import { stopMediaStream } from '../src/scanner/media.js'

test('all media tracks are stopped during cleanup', () => {
  const calls = []
  stopMediaStream({ getTracks: () => [{ stop: () => calls.push('video') }, { stop: () => calls.push('audio') }] })
  assert.deepEqual(calls, ['video', 'audio'])
})

test('cleanup safely ignores a missing stream', () => {
  assert.doesNotThrow(() => stopMediaStream(null))
})
