# Scan State Machine

Expected states are idle, detected, scanning, and complete. Transitions should reset timers and transient UI state when leaving scanning. New states should define entry, exit, and cleanup behavior before implementation.