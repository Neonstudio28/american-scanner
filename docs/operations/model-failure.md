# Model failure recovery

If the face detector model cannot be loaded, the application should remain usable rather than entering an infinite loading state.

The UI should expose a clear degraded-mode message, avoid claiming detector accuracy it does not have, and keep reset/retry behavior available.
