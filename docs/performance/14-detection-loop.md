# Detection-loop performance

The detection loop schedules itself with `requestAnimationFrame`, while model inference is asynchronous. Performance work should avoid overlapping expensive inference calls, unnecessary canvas allocations, and React state updates on every animation frame.