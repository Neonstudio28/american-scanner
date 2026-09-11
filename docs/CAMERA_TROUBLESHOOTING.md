# Camera Troubleshooting

## Permission denied

Ask the user to check site camera permissions and retry. Do not repeatedly request permission in a loop.

## Camera unavailable

Verify another application is not holding the camera. Surface a plain-language error and keep the rest of the UI usable.

## Detection does not start

Confirm the model assets are reachable and the video element has reached a playable readyState.
