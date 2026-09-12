# Detection loop QA

The detector loop should remain bounded and cancellable.

1. Start with an unavailable video element and verify the loop waits without throwing.
2. Stop the component while a detector request is pending.
3. Verify a failed detector call does not terminate future frames.
4. Verify scanning pauses additional detection work.
5. Verify completion pauses additional detection work.
6. Verify reset cancels pending timers and returns the UI to idle.
