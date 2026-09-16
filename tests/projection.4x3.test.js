import test from 'node:test'
import assert from 'node:assert/strict'
import { projectMirroredBox } from '../src/scanner/projection.js'

test('4:3 input applies vertical crop compensation', () => {
  const projected = projectMirroredBox({ xMin: 160, yMin: 120, width: 320, height: 240 }, 640, 480)
  assert.ok(projected)
  assert.equal(projected.width, 640)
  assert.equal(projected.height, 480)
  assert.equal(projected.y, 0)
})
