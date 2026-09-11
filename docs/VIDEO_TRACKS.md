# Video Track Lifecycle

Camera tracks should be stopped during cleanup and reset flows. Treat the media stream as disposable state and never retain stale track references after a scan session ends.