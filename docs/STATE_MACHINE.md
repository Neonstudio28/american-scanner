# Scanner State Machine

Primary states are `idle`, `detected`, `scanning`, and `complete`.

Transitions should be explicit:

- `idle -> detected` after stable detection.
- `detected -> scanning` after the short confirmation delay.
- `scanning -> complete` when progress reaches 100%.
- `detected/scanning -> idle` when the subject disappears or the scan is reset.

Keep React state and refs synchronized so asynchronous callbacks do not act on stale phases.