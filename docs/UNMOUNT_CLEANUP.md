# Unmount Cleanup

Component teardown must cancel animation frames, timers, media tracks, audio playback, and stale callbacks. Cleanup should be safe to run more than once.