# Error Handling

User-facing failures should be recoverable and specific.

- Camera failures: explain permission or device causes.
- Model failures: explain degraded/fallback mode.
- Audio failures: continue without sound.
- Detection exceptions: keep the scanner usable and avoid logging sensitive frame data.
- Cleanup errors: swallow non-critical teardown errors after attempting all remaining cleanup.
