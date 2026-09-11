# Performance Notes

The scanning loop should minimize work per animation frame.

- Reuse canvases where practical instead of allocating one on every fallback detection.
- Keep DOM writes localized to animated elements.
- Cancel animation frames and intervals during cleanup.
- Avoid repeated model initialization.
- Prefer CSS transforms for decorative motion.
