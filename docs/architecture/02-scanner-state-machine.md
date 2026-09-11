# Scanner state machine

The scanner uses four user-facing phases: `idle`, `detected`, `scanning`, and `complete`.

- `idle`: waiting for a stable face detection.
- `detected`: a face has remained detected long enough to begin the scan.
- `scanning`: progress and scan metrics are updated until the fixed scan duration completes.
- `complete`: completion effects run and the user can reset the experience.

The phase ref mirrors React state so the animation/detection loop can read the latest phase without depending on a stale render closure. Resetting clears visual state and active audio resources.
