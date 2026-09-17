import test from 'node:test'
import assert from 'node:assert/strict'
import { stopMediaStream } from '../src/scanner/media.js'

test('all media tracks are stopped during cleanup', () => {
  const calls = []
  stopMediaStream({ getTracks: () => [{ stop: () => calls.push('video') }, { stop: () => calls.push('audio') }] })
  assert.deepEqual(calls, ['video', 'audio'])
})

test('cleanup continues when one track fails to stop', () => {
  const calls = []
  const stream = {
    getTracks: () => [
      { stop: () => { throw new Error('track already closed') } },
      { stop: () => calls.push('audio') },
    ],
  }

  assert.doesNotThrow(() => stopMediaStream(stream))
  assert.deepEqual(calls, ['audio'])
})

test('cleanup tolerates tracks without a stop method', () => {
  assert.doesNotThrow(() => stopMediaStream({ getTracks: () => [{}] }))
})

test('cleanup safely ignores a missing stream', () => {
  assert.doesNotThrow(() => stopMediaStream(null))
})
