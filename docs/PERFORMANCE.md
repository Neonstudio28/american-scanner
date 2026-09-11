# Performance Notes

Avoid unnecessary React renders during the 30ms scan progress loop. Keep animation-only DOM updates in refs where practical, cancel requestAnimationFrame work on cleanup, and avoid allocating canvases or large objects on every frame.

For camera processing, prefer small detector input sizes when acceptable and stop work immediately when scanning completes.