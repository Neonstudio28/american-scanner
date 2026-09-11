# Reset Behavior

Reset must return the scanner to a clean idle state.

It should clear detection overlays, scan progress, completion effects, generated visual state, audio playback, and active audio contexts. Media tracks remain available only if the camera lifecycle intentionally keeps them open for the next scan.