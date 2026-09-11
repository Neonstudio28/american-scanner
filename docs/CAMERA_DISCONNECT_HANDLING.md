# Camera Disconnect Handling

A camera stream can end while the app is open because a device is unplugged, another application takes the camera, or the browser revokes access.

Handle `MediaStreamTrack` `ended` events and return the scanner to a recoverable idle state rather than leaving the interface in a scanning state.