# Audio boundary

Audio is optional feedback. Failure to create an `AudioContext` or play the anthem must never block scanning, completion, or reset. All audio handles need a single cleanup path.