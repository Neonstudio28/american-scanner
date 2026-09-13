# Camera permission QA

Verify that the scanner remains usable when camera access is denied, revoked, unavailable, or interrupted.

## Cases
- Deny permission before the first request.
- Reload after a previous denial.
- Revoke camera permission while the page is open.
- Stop the active video track and confirm the UI leaves the scanning state safely.
- Verify no microphone permission is requested.

## Expected behavior
The application should surface a clear recovery path and must not imply that a face was detected when no camera frames are available.
