import test from 'node:test'
import assert from 'node:assert/strict'
import { stopAudio } from '../src/scanner/media.js'

test('audio cleanup pauses playback and rewinds to the start', () => {
  let paused = false
  const audio = {
    currentTime: 12.5,
    pause() {
      paused = true
    },
  }

  stopAudio(audio)

  assert.equal(paused, true)
  assert.equal(audio.currentTime, 0)
})

test('audio cleanup safely ignores missing audio', () => {
  assert.doesNotThrow(() => stopAudio(null))
})

test('audio cleanup still rewinds when pause throws', () => {
  const audio = {
    currentTime: 8,
    pause() {
      throw new Error('playback already detached')
    },
  }

  assert.doesNotThrow(() => stopAudio(audio))
  assert.equal(audio.currentTime, 0)
})

test('audio cleanup tolerates a read-only currentTime', () => {
  const audio = { pause() {} }
  Object.defineProperty(audio, 'currentTime', {
    value: 4,
    writable: false,
  })

  assert.doesNotThrow(() => stopAudio(audio))
  assert.equal(audio.currentTime, 4)
})
