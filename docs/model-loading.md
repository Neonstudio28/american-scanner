# Model Loading

Model initialization should expose a loading state, tolerate network failures, and never block the rest of the UI from rendering.

A model load failure should switch to the documented fallback path and make the degraded mode observable to the user without exposing internal stack traces.
