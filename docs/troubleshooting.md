# Troubleshooting

### Camera is unavailable

Check browser permission settings and make sure the page is served from a secure context.

### Model does not load

Confirm the model assets are present under the expected public path and inspect the browser console for network failures.

### Audio does not start

Browsers may block autoplay. Start audio only after a user gesture or handle rejected `play()` promises gracefully.

### Scan gets stuck

Reset the scanner, verify the camera stream is still active, and inspect whether the detection loop or scan timer was cleaned up correctly.
