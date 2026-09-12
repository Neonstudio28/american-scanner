# Camera disconnect recovery

A camera stream can end after startup because the device is removed, another application takes control, or the browser revokes access.

The scanner should detect ended tracks, clear stale preview state, stop detector work, and expose a retry path. Recovery must not require a full page reload.
