# Camera data handling

The scanner uses camera frames for on-device detection. Camera access should be limited to the active scanner session.

No captured frame should be persisted, uploaded, or logged as part of normal scanning. When a session ends, stop every camera track and release associated media resources.
