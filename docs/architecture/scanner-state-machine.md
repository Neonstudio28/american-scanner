# Scanner state machine

The scanner progresses through `idle`, `detected`, `scanning`, and `complete` states. State transitions should be explicit and reversible so camera loss, reset, and model failures cannot leave the UI in a stale phase.