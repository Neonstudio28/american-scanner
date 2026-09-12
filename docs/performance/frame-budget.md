# Detection frame budget

Keep camera UI responsive by avoiding unbounded work per animation frame.

- Skip detector work when the video frame is not ready.
- Avoid allocating large canvases for fallback detection.
- Never start a second scan interval while one is active.
- Cancel animation frames and intervals during teardown.
- Keep decorative animation independent from detection scheduling.
