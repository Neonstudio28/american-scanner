# Model Loading

The face detector is loaded asynchronously from `/models`.

Maintain these invariants:

- UI remains usable while the model loads.
- A failed model load switches to the documented fallback path.
- Loading state is cleared on both success and failure.
- Detection does not begin until video and detector state are ready.
