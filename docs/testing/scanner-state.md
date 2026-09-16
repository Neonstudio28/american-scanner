# Scanner state testing

The scanner uses four phases: `idle`, `detected`, `scanning`, and `complete`.

## Invariants

- `idle` may enter `detected` only after the configured detection streak.
- `detected` may return to `idle` when the subject is lost.
- `detected` may enter `scanning` after the detection hold period.
- `scanning` may finish as `complete` or recover to `idle`.
- `complete` returns to `idle` when a new scan is requested.

Tests should cover both legal transitions and attempts to skip phases. Keeping the transition table separate from React state makes race conditions easier to reason about and keeps UI changes from silently changing scanner behavior.
