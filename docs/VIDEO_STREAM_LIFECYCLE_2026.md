# Video Stream Lifecycle

Acquire the camera once for the active session, attach it to the video element, and stop every track during reset or unmount. Avoid leaving camera indicators active after the user exits the scanner.