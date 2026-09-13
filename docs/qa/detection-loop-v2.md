# Detection-loop QA

The detection loop should be treated as an asynchronous resource with an explicit cleanup path.

Acceptance checks:
1. Only one animation-frame chain is active for a mounted scanner.
2. An in-flight detector promise cannot advance a scan after unmount.
3. Reset clears stale detection state.
4. Detector exceptions are isolated from the animation loop.
5. A completed scan does not start a second scan while completion effects run.