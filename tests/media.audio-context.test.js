import test from 'node:test'
import assert from 'node:assert/strict'
import { closeAudioContext } from '../src/scanner/media.js'

test('audio context cleanup closes an active context', async () => {
  let closed = false
  await closeAudioContext({
    close() {
      closed = true
    },
  })
  assert.equal(closed, true)
})

test('audio context cleanup resolves for a missing context', async () => {
  await assert.doesNotReject(closeAudioContext(null))
})

test('audio context cleanup absorbs synchronous close failures', async () => {
  await assert.doesNotReject(closeAudioContext({
    close() {
      throw new Error('context already closed')
    },
  }))
})

test('audio context cleanup absorbs rejected close promises', async () => {
  await assert.doesNotReject(closeAudioContext({
    close() {
      return Promise.reject(new Error('close rejected'))
    },
  }))
})
