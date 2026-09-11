# Reset Semantics

Reset must return the scanner to a clean idle state: stop active media, cancel animation/timer work, clear transient detection data, and release audio resources. Reset should also be safe during partial initialization.