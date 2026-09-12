# Audio lifecycle QA

Audio resources must be treated as disposable browser resources.

- Start audio only after a user gesture when autoplay policy requires it.
- Keep references to active media players so a reset can stop them.
- Close Web Audio contexts during teardown.
- Treat rejected `play()` promises as recoverable rather than fatal.
- Verify repeated scans do not create overlapping anthem players or audio contexts.
- Verify unmounting the scanner leaves no active audio playback.
