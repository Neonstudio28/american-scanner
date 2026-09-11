# Repeated reset

Calling reset repeatedly should be idempotent. No duplicate timers, audio contexts, animation frames, or camera tracks should accumulate between resets.