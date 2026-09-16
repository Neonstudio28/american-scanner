# Camera lifecycle QA

Verify camera behavior at four points: initial mount, permission denial, active-stream interruption, and unmount.

A denied request must leave the interface usable without a stream. An interrupted stream must not leave stale camera state visible. Unmount must stop every acquired media track so the browser indicator can clear.

When testing, repeat the cases after navigating away and back, switching tabs, and resizing the viewport. These scenarios expose lifecycle leaks that are easy to miss during a single happy-path scan.
