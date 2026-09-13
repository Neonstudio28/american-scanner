# Audio autoplay QA

The scanner uses browser audio APIs for completion effects.

Check these browser conditions:
- audio starts only after an allowed user gesture when required;
- a rejected `play()` promise does not interrupt scan completion;
- repeated scans do not leave multiple audio players active;
- reset stops the current player and releases the Web Audio context.

A failed optional sound should never block the primary scanner result.