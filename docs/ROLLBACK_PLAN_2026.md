# Rollback Plan

If a deployment breaks camera startup, model loading, or the result flow, revert to the last known-good build. Preserve a simple rollback path and record the failure cause before retrying.