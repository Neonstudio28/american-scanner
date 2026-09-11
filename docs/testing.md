# Testing Strategy

The scanner should be tested in layers:

## Pure logic

Test state transitions, progress calculations, score formatting, and reset behavior without a camera.

## Browser integration

Mock `getUserMedia`, model loading, animation frames, and audio playback to verify lifecycle behavior.

## Manual checks

Verify camera permission denial, missing model files, blocked autoplay, reduced motion, narrow screens, and repeated scan/reset cycles.
