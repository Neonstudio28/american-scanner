# Camera boundary

Camera access is a browser capability, not an application assumption. Acquire the stream only after the page is ready, keep the stream local to the active scan, and stop every track during cleanup.