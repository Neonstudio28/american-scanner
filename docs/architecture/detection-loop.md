# Detection loop

The detection loop should yield to the browser with `requestAnimationFrame`, skip work while a scan is active, and cancel itself on unmount. Async detector calls must not schedule work after teardown.