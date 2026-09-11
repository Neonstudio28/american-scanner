# Architecture Overview

The UI is centered in `src/App.jsx` with global and component styling in `src/App.css`.

Major responsibilities:

- Camera lifecycle and media cleanup.
- Face/model initialization.
- Detection loop and scan state transitions.
- Progress and result presentation.
- Decorative animation and audio effects.

Future refactors should separate camera, detection, scoring, and presentation concerns so each can be tested independently.
