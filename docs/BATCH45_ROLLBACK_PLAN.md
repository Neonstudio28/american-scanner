# Rollback Plan

If a release introduces camera, detection, or audio regressions, revert to the last verified build and record the failing scenario before attempting another fix. Keep rollback independent of the scanner runtime.