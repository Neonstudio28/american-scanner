export const SCAN_PHASES = Object.freeze({
  IDLE: 'idle',
  DETECTED: 'detected',
  SCANNING: 'scanning',
  COMPLETE: 'complete',
})

const transitions = {
  idle: new Set(['detected']),
  detected: new Set(['idle', 'scanning']),
  scanning: new Set(['idle', 'complete']),
  complete: new Set(['idle']),
}

export function canTransition(from, to) {
  return from === to || Boolean(transitions[from]?.has(to))
}

export function transition(from, to) {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid scanner transition: ${from} -> ${to}`)
  }
  return to
}
