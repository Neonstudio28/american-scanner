# Scanner State Machine

The scanner currently moves through these high-level phases:

`idle → detected → scanning → complete`

A failed or lost detection can return the experience to `idle`. Reset should always clear timers, camera-derived UI state, animation state, and audio resources.

Any future state should document its entry conditions, exit conditions, user-visible message, and cleanup requirements.
