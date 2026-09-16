import test from 'node:test'
import assert from 'node:assert/strict'
import { projectMirroredBox } from '../src/scanner/projection.js'

test('16:9 input maps coordinates without crop offsets', () => {
  const projected = projectMirroredBox({ xMin: 100, yMin: 50, width: 200, height: 300 }, 1280, 720)
  assert.deepEqual(projected, { x: 980, y: 50, width: 200, height: 300 })
})

test('invalid source dimensions return no projection', () => {
  assert.equal(projectMirroredBox({ xMin: 0, yMin: 0, width: 1, height: 1 }, 0, 720), null)
})
