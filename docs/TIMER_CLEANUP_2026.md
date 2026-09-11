# Timer Cleanup

Every interval and timeout created by the scanner should have a clear owner and cleanup path. Reset and unmount must prevent delayed callbacks from mutating stale UI state.