# Security Notes

The scanner runs camera access in the browser and loads the face detector from a public CDN. Keep permissions explicit, avoid persisting frames, and never add telemetry that captures camera pixels. Review dependency and CDN changes before release.

## Review points
- Use HTTPS for camera access in production.
- Never commit model binaries or captured media.
- Treat third-party scripts as part of the trusted computing base.
