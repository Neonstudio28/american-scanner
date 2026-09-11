# Camera and Model Security

The scanner requests camera access only in the browser and does not intentionally upload camera frames to a server.

## Review checklist

- Keep camera access scoped to the active page lifecycle.
- Stop all media tracks when the app unmounts.
- Avoid persisting captured frames or face boxes in local storage.
- Treat CDN model scripts as third-party dependencies and pin versions where practical.
- Review model-loading failures without exposing sensitive camera data in logs.
