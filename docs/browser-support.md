# Browser Support

The experience depends on browser camera APIs, Web Audio, requestAnimationFrame, and modern module support.

## Baseline checks

- HTTPS or a secure local context for camera access.
- `navigator.mediaDevices.getUserMedia` availability.
- Web Audio API availability.
- `requestAnimationFrame` availability.
- Graceful UI when any capability is missing.
