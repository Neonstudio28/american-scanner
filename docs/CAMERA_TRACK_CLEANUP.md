# Camera Track Cleanup

All acquired media tracks should be stopped during unmount and when the scanner no longer needs the stream. Cleanup must be idempotent so repeated reset/unmount paths do not throw.
