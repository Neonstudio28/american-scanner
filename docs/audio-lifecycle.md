# Audio Lifecycle

Audio effects are optional decoration and must never be required for the scan result.

- Store active audio handles so they can be stopped.
- Handle autoplay rejection without treating it as a scan failure.
- Close temporary `AudioContext` instances during reset.
- Avoid creating repeated contexts for the same completion event.
